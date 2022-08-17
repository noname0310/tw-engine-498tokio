import { AnimationClip } from "./AnimationClip";
import { AnimationSequenceInstance } from "../instance/AnimationSequenceInstance";
import { AnimationTrack } from "./AnimationTrack";
import { AnimationClipBindInfo } from "../AnimationClipBindInfo";
import { IAnimationContainer } from "./IAnimationContainer";
import { AnimationEventTrack } from "./AnimationEventTrack";

type UnwrapRangedAnimation<T extends RangedAnimation<any>> = T extends RangedAnimation<infer U> ? U : never;

export type InferedSequenceBindData<T extends ContainerData> = 
    any[] extends T
        ? NonRecursiveSequenceBindItem[]
        : {
            [key in keyof T]: 
                T[key] extends RangedAnimation<any>
                    ? UnwrapRangedAnimation<T[key]> extends AnimationClip<infer _, infer U>
                        ? AnimationClipBindInfo<U>
                        : UnwrapRangedAnimation<T[key]> extends AnimationTrack<infer U>
                            ? (value: U) => void
                            : UnwrapRangedAnimation<T[key]> extends AnimationEventTrack<infer _, infer U>
                                ? U
                                : UnwrapRangedAnimation<T[key]> extends AnimationSequence<infer _, infer U>
                                    ? U
                                    : UnwrapRangedAnimation<T[key]> extends IAnimationContainer<infer U>
                                        ? U
                                        : never
                    : never;
        };

export class RangedAnimation<T extends IAnimationContainer<unknown>> {
    public readonly offset: number;
    public readonly startFrame?: number;
    public readonly endFrame?: number;
    public readonly animation: T;

    public constructor(animation: T, offset = 0, startFrame?: number, endFrame?: number) {
        this.animation = animation;
        this.offset = offset;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
    }
}

export type ContainerData = RangedAnimation<IAnimationContainer<any>>[];

export type SequenceBindItem = AnimationClipBindInfo<any>|((value: any) => void)|SequenceBindInfo;

export type NonRecursiveSequenceBindItem = (AnimationClipBindInfo<any>|((value: any) => void)|any[]);

export type SequenceBindInfo = SequenceBindItem[];

export class AnimationSequence<T extends ContainerData, U extends InferedSequenceBindData<T> = InferedSequenceBindData<T>> implements IAnimationContainer<U> {
    public readonly animationContainers: T;
    public readonly startFrame: number;
    public readonly endFrame: number;
    public readonly frameRate: number;

    public constructor(animationContainers: [...T], frameRate = 60) {
        this.animationContainers = animationContainers;

        let minStartFrame = Number.MAX_SAFE_INTEGER;
        let maxEndFrame = 0;
        for (let i = 0; i < animationContainers.length; i++) {
            const animationContainer = animationContainers[i];
            const frameRateRatio = frameRate / animationContainer.animation.frameRate;
            const startFrame = (animationContainer.startFrame ?? animationContainer.animation.startFrame * frameRateRatio)  + animationContainer.offset;
            const endFrame = (animationContainer.endFrame ?? animationContainer.animation.endFrame * frameRateRatio) + animationContainer.offset;
            if (startFrame < minStartFrame) {
                minStartFrame = startFrame;
            }
            if (endFrame > maxEndFrame) {
                maxEndFrame = endFrame;
            }
        }
        this.startFrame = minStartFrame;
        this.endFrame = maxEndFrame;

        if (frameRate <= 0) {
            throw new Error("AnimationSequence: frameRate must be positive");
        }
        this.frameRate = frameRate;
    }

    public createInstance(bindData: U): AnimationSequenceInstance<T, U> {
        return new AnimationSequenceInstance(this, bindData);
    }
}

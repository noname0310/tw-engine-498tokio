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
                                    : never
                    : never;
        };

export class RangedAnimation<T extends IAnimationContainer<unknown>> {
    public readonly offset: number;
    public readonly startFrame: number;
    public readonly endFrame: number;
    public readonly animation: T;

    public constructor(animation: T, offset = 0, startFrame?: number, endFrame?: number) {
        this.animation = animation;
        this.offset = offset;
        if (startFrame) {
            this.startFrame = startFrame;
        } else {
            this.startFrame = animation.startFrame;
        }
        if (endFrame) {
            this.endFrame = endFrame;
        } else {
            this.endFrame = animation.endFrame;
        }
    }
}

export type ContainerData = RangedAnimation<IAnimationContainer<unknown>>[];

export type SequenceBindItem = AnimationClipBindInfo<any>|((value: any) => void)|SequenceBindInfo;

export type NonRecursiveSequenceBindItem = (AnimationClipBindInfo<any>|((value: any) => void)|any[]);

export type SequenceBindInfo = SequenceBindItem[];

export class AnimationSequence<T extends ContainerData, U extends InferedSequenceBindData<T>> implements IAnimationContainer<SequenceBindItem> {
    public readonly animationContainers: T;
    public readonly startFrame: number;
    public readonly endFrame: number;

    public constructor(animationContainers: [...T]) {
        this.animationContainers = animationContainers;

        let minStartFrame = Number.MAX_SAFE_INTEGER;
        let maxEndFrame = 0;
        for (let i = 0; i < animationContainers.length; i++) {
            const animationContainer = animationContainers[i];
            const startFrame = animationContainer.startFrame + animationContainer.offset;
            const endFrame = animationContainer.endFrame + animationContainer.offset;
            if (startFrame < minStartFrame) {
                minStartFrame = startFrame;
            }
            if (endFrame > maxEndFrame) {
                maxEndFrame = endFrame;
            }
        }
        this.startFrame = minStartFrame;
        this.endFrame = maxEndFrame;
    }

    public createInstance(bindData: U): AnimationSequenceInstance<T, U> {
        return new AnimationSequenceInstance(this, bindData);
    }
}

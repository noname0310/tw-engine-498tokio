import { AnimationSequenceInstance } from "./AnimationSequenceInstance";
import { IAnimationContainer } from "./IAnimationContainer";

export class RangedAnimation<T extends IAnimationContainer<U>, U> {
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

export type ContainerData = RangedAnimation<IAnimationContainer<any>, any>[];

export class AnimationSequence<T extends ContainerData> implements IAnimationContainer<T> {
    public readonly animationContainers: T;
    public readonly startFrame: number;
    public readonly endFrame: number;

    public constructor(animationContainers: [...T]) {
        this.animationContainers = animationContainers;

        let minStartFrame = Number.MAX_SAFE_INTEGER;
        let maxEndFrame = 0;
        for (let i = 0; i < animationContainers.length; i++) {
            if (animationContainers[i].startFrame < minStartFrame) {
                minStartFrame = animationContainers[i].startFrame;
            }
            if (animationContainers[i].endFrame > maxEndFrame) {
                maxEndFrame = animationContainers[i].endFrame;
            }
        }
        this.startFrame = minStartFrame;
        this.endFrame = maxEndFrame;
    }

    public createInstance(bindData: any[]): AnimationSequenceInstance<T> {
        return new AnimationSequenceInstance(this, bindData);
    }
}

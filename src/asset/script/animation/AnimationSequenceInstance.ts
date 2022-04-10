import { AnimationSequence, ContainerData, InferedSequenceBindData, SequenceBindInfo } from "./AnimationSequence";
import { IAnimationInstance } from "./IAniamtionInstance";

export class AnimationSequenceInstance<T extends ContainerData, U extends InferedSequenceBindData<T>> implements IAnimationInstance {
    private _bindInfo: SequenceBindInfo;

    private _animationSequence: AnimationSequence<T, U>;
    private _animationContainerInstances: IAnimationInstance[];

    public constructor(animationSequence: AnimationSequence<T, U>, bindInfo: SequenceBindInfo) {
        this._bindInfo = bindInfo.slice();
        this._animationSequence = animationSequence;
        this._animationContainerInstances = [];
        const slicedBindInfo = this._bindInfo;
        for (let i = 0; i < slicedBindInfo.length; ++i) {
            const animationContainer = this._animationSequence.animationContainers[i];
            const animationContainerInstance = animationContainer.animation.createInstance(slicedBindInfo[i]);
            this._animationContainerInstances.push(animationContainerInstance);
        }
    }

    public get bindInfo(): SequenceBindInfo {
        return this._bindInfo;
    }

    public set bindInfo(bindInfo: SequenceBindInfo) {
        this._animationContainerInstances.length = 0;
        this._bindInfo = bindInfo.slice();
        const slicedBindInfo = this._bindInfo;
        for (let i = 0; i < slicedBindInfo.length; ++i) {
            const animationContainer = this._animationSequence.animationContainers[i];
            const animationContainerInstance = animationContainer.animation.createInstance(slicedBindInfo[i]);
            this._animationContainerInstances.push(animationContainerInstance);
        }
    }

    public frameIndexHint(frameIndex: number): void {
        for (let i = 0; i < this._animationContainerInstances.length; ++i) {
            this._animationContainerInstances[i].frameIndexHint(frameIndex);
        }
    }

    public process(frameTime: number): void {
        if (frameTime < this._animationSequence.startFrame) frameTime = this._animationSequence.startFrame;
        if (this._animationSequence.endFrame < frameTime) frameTime = this._animationSequence.endFrame;

        //todo: optimize this to use sequential update scheduling

        const animationSequence = this._animationSequence;
        for (let i = 0; i < this._animationContainerInstances.length; ++i) {
            const animationContainer = animationSequence.animationContainers[i];
            let offsetedFrameTime = frameTime - animationContainer.offset;
            if (offsetedFrameTime < animationContainer.startFrame) offsetedFrameTime = animationContainer.startFrame;
            if (animationContainer.endFrame < offsetedFrameTime) offsetedFrameTime = animationContainer.endFrame;
            this._animationContainerInstances[i].process(offsetedFrameTime);
        }
    }
}

import { AnimationSequence, ContainerData, InferedSequenceBindData, SequenceBindInfo } from "../container/AnimationSequence";
import { IAnimationInstance } from "./IAniamtionInstance";

type RangedAnimationInstance = { offset: number, start: number, end: number, animation: IAnimationInstance };

class ActivationInfoNode {
    public readonly frame: number;
    public readonly animationInstance: RangedAnimationInstance;
    
    public constructor(frame: number, animationInstance: RangedAnimationInstance) {
        this.frame = frame;
        this.animationInstance = animationInstance;
    }
}

export class AnimationSequenceInstance<T extends ContainerData, U extends InferedSequenceBindData<T>> implements IAnimationInstance {
    private _bindInfo: SequenceBindInfo;

    private readonly _animationSequence: AnimationSequence<T, U>;

    private _animationActivationInfo: ActivationInfoNode[];
    private _animationDeActivationInfo: ActivationInfoNode[];
    private _currentActivationFrameIndex: number;
    private _currentDeActivationFrameIndex: number;
    private _runningAnimations: Set<RangedAnimationInstance>;

    public constructor(animationSequence: AnimationSequence<T, U>, bindInfo: SequenceBindInfo) {
        this._bindInfo = bindInfo.slice();
        this._animationSequence = animationSequence;

        const animationContainerInstances: RangedAnimationInstance[] = [];
        const slicedBindInfo = this._bindInfo;
        for (let i = 0; i < slicedBindInfo.length; ++i) {
            const animationContainer = this._animationSequence.animationContainers[i];
            const animationContainerInstance = animationContainer.animation.createInstance(slicedBindInfo[i]);
            animationContainerInstances.push({
                offset: animationContainer.offset,
                start: animationContainer.startFrame,
                end: animationContainer.endFrame,
                animation: animationContainerInstance
            });
        }
        
        animationContainerInstances.sort((a, b) => (a.offset + a.start) - (b.offset + b.start));
        this._animationActivationInfo = [];
        for (let i = 0; i < animationContainerInstances.length; ++i) {
            const animationContainerInstance = animationContainerInstances[i];
            this._animationActivationInfo.push(
                new ActivationInfoNode(
                    animationContainerInstance.offset + animationContainerInstance.start,
                    animationContainerInstance
                )
            );
        }

        animationContainerInstances.sort((a, b) => (a.offset + a.end) - (b.offset + b.end));
        this._animationDeActivationInfo = [];
        for (let i = 0; i < animationContainerInstances.length; ++i) {
            const animationContainerInstance = animationContainerInstances[i];
            this._animationDeActivationInfo.push(
                new ActivationInfoNode(
                    animationContainerInstance.offset + animationContainerInstance.end,
                    animationContainerInstance
                )
            );
        }

        this._currentActivationFrameIndex = -1;
        this._currentDeActivationFrameIndex = -1;

        this._runningAnimations = new Set<RangedAnimationInstance>();
    }

    public get animationContainer(): AnimationSequence<T, U> {
        return this._animationSequence;
    }

    public get bindInfo(): SequenceBindInfo {
        return this._bindInfo;
    }

    public set bindInfo(bindInfo: SequenceBindInfo) {
        this._bindInfo = bindInfo.slice();
        
        const animationContainerInstances: RangedAnimationInstance[] = [];
        const slicedBindInfo = this._bindInfo;
        for (let i = 0; i < slicedBindInfo.length; ++i) {
            const animationContainer = this._animationSequence.animationContainers[i];
            const animationContainerInstance = animationContainer.animation.createInstance(slicedBindInfo[i]);
            animationContainerInstances.push({
                offset: animationContainer.offset,
                start: animationContainer.startFrame,
                end: animationContainer.endFrame,
                animation: animationContainerInstance
            });
        }

        animationContainerInstances.sort((a, b) => (a.offset + a.start) - (b.offset + b.start));
        this._animationActivationInfo = [];
        for (let i = 0; i < animationContainerInstances.length; ++i) {
            const animationContainerInstance = animationContainerInstances[i];
            this._animationActivationInfo.push(
                new ActivationInfoNode(
                    animationContainerInstance.offset + animationContainerInstance.start,
                    animationContainerInstance
                )
            );
        }

        animationContainerInstances.sort((a, b) => (a.offset + a.end) - (b.offset + b.end));
        this._animationDeActivationInfo = [];
        for (let i = 0; i < animationContainerInstances.length; ++i) {
            const animationContainerInstance = animationContainerInstances[i];
            this._animationDeActivationInfo.push(
                new ActivationInfoNode(
                    animationContainerInstance.offset + animationContainerInstance.end,
                    animationContainerInstance
                )
            );
        }

        this._currentActivationFrameIndex = -1;
        this._currentDeActivationFrameIndex = -1;

        this._runningAnimations.clear();
    }

    public frameIndexHint(frameIndex: number): void {
        for (const animationInstance of this._runningAnimations) {
            animationInstance.animation.frameIndexHint(frameIndex);
        }
    }

    public process(frameTime: number): void {
        if (frameTime < this._animationSequence.startFrame) frameTime = this._animationSequence.startFrame;
        if (this._animationSequence.endFrame < frameTime) frameTime = this._animationSequence.endFrame;

        const runningAnimations = this._runningAnimations;

        const activationInfo = this._animationActivationInfo;
        let activationFrameIndex = this._currentActivationFrameIndex;

        const deActivationInfo = this._animationDeActivationInfo;
        let deActivationFrameIndex = this._currentDeActivationFrameIndex;

        while (0 <= deActivationFrameIndex && frameTime < deActivationInfo[deActivationFrameIndex].frame) {
            runningAnimations.add(deActivationInfo[deActivationFrameIndex].animationInstance);
            deActivationFrameIndex -= 1;
            // console.log(`Activate animation on frame ${frameTime} from deactivation`);
        }
        while (0 <= activationFrameIndex && frameTime < activationInfo[activationFrameIndex].frame) {
            const animationInstance = activationInfo[activationFrameIndex].animationInstance;
            runningAnimations.delete(animationInstance);
            activationFrameIndex -= 1;
            
            animationInstance.animation.process(animationInstance.start);
            // console.log(`Deactivate animation on frame ${frameTime} from actavation`);
        }
        while (activationFrameIndex < activationInfo.length - 1 && activationInfo[activationFrameIndex + 1].frame <= frameTime) {
            runningAnimations.add(activationInfo[activationFrameIndex + 1].animationInstance);
            activationFrameIndex += 1;
            // console.log(`Activate animation on frame ${frameTime} from actavation`);
        }
        while (deActivationFrameIndex < deActivationInfo.length - 1 && deActivationInfo[deActivationFrameIndex + 1].frame <= frameTime) {
            const animationInstance = deActivationInfo[deActivationFrameIndex + 1].animationInstance;
            runningAnimations.delete(animationInstance);
            deActivationFrameIndex += 1;

            animationInstance.animation.process(animationInstance.end);
            // console.log(`Deactivate animation on frame ${frameTime} from deactivation`);
        }

        this._currentActivationFrameIndex = activationFrameIndex;
        this._currentDeActivationFrameIndex = deActivationFrameIndex;
        
        for (const animationInstance of runningAnimations) {
            let offsetedFrameTime = frameTime - animationInstance.offset;

            if (offsetedFrameTime < animationInstance.start) offsetedFrameTime = animationInstance.start;
            if (animationInstance.end < offsetedFrameTime) offsetedFrameTime = animationInstance.end;

            animationInstance.animation.process(offsetedFrameTime);
        }
    }
}

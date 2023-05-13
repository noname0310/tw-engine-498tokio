import { AnimationClipBindData, AnimationClipBindInfo } from "../bind/AnimationClipBindInfo";
import { AnimationClipBindResult } from "../bind/AnimationClipBindResult";
import { AnimationClip, InferedAnimationClipBindData, TrackData } from "../container/AnimationClip";
import { IAnimationInstance } from "./IAniamtionInstance";
import { IAnimationTrackInstance } from "./IAnimationTrackInstance";

export class AnimationClipInstance<T extends TrackData, U extends InferedAnimationClipBindData<T> = InferedAnimationClipBindData<T>> implements IAnimationInstance {
    private _bindInfo: AnimationClipBindInfo<U>;

    private readonly _animationClip: AnimationClip<T, U>;
    private readonly _animationTrackInstances: IAnimationTrackInstance[];

    private constructor(animationClip: AnimationClip<T, U>, bindInfo: AnimationClipBindInfo<U>) {
        this._bindInfo = bindInfo;
        this._animationClip = animationClip;
        this._animationTrackInstances = [];
    }

    public static create<T extends TrackData, U extends InferedAnimationClipBindData<T> = InferedAnimationClipBindData<T>>(
        animationClip: AnimationClip<T, U>,
        bindInfo: AnimationClipBindInfo<U>
    ): AnimationClipInstance<T, U> {
        const animationClipInstance = new AnimationClipInstance(animationClip, bindInfo);
        animationClipInstance.bindInfo = bindInfo;
        return animationClipInstance;
    }

    public static tryCreate<T extends TrackData, U extends InferedAnimationClipBindData<T> = InferedAnimationClipBindData<T>>(
        animationClip: AnimationClip<T, U>,
        bindInfo: AnimationClipBindInfo<U>
    ): [AnimationClipInstance<T, U>, AnimationClipBindResult] {
        const animationClipInstance = new AnimationClipInstance(animationClip, bindInfo);
        const bindResult = animationClipInstance.tryBind(bindInfo);
        return [animationClipInstance, bindResult];
    }

    public get animationContainer(): AnimationClip<T, U> {
        return this._animationClip;
    }

    public get bindInfo(): AnimationClipBindInfo<U> {
        return this._bindInfo;
    }

    public set bindInfo(bindInfo: AnimationClipBindInfo<U>) {
        this._animationTrackInstances.length = 0;
        const bindData = bindInfo.data as AnimationClipBindData;
        for (let i = 0; i < bindData.length; ++i) {
            const track = this._animationClip.getTrackFromName(bindData[i].trackName);
            if (track === null) {
                throw new Error(`AnimationClipInstance: track not found: ${bindData[i].trackName}`);
            }
            this._animationTrackInstances.push(track.createInstance(bindData[i].target) as IAnimationTrackInstance);
        }
        this._bindInfo = bindInfo;
    }

    public tryBind(bindInfo: AnimationClipBindInfo<U>): AnimationClipBindResult {
        const bindFailTrackNames: string[] = [];

        this._animationTrackInstances.length = 0;
        const bindData = bindInfo.data as AnimationClipBindData;
        for (let i = 0; i < bindData.length; ++i) {
            const track = this._animationClip.getTrackFromName(bindData[i].trackName);
            if (track === null) {
                bindFailTrackNames.push(bindData[i].trackName);
                continue;
            }
            this._animationTrackInstances.push(track.createInstance(bindData[i].target) as IAnimationTrackInstance);
        }
        this._bindInfo = bindInfo;

        return new AnimationClipBindResult(bindFailTrackNames);
    }

    public frameIndexHint(frameIndex: number): void {
        const frameRate = this._animationClip.frameRate;

        const animationTrackInstances = this._animationTrackInstances;
        for (let i = 0; i < animationTrackInstances.length; ++i) {
            const trackInstance = animationTrackInstances[i];
            const trackFrameRate = trackInstance.animationContainer.frameRate;
            const frameRateRatio = frameRate / trackFrameRate;

            this._animationTrackInstances[i].frameIndexHint(frameIndex / frameRateRatio);
        }
    }

    public process(frameTime: number, unTrimmedFrameTime = frameTime): void {
        if (frameTime < this._animationClip.startFrame) frameTime = this._animationClip.startFrame;
        //console.log(`AnimationClipInstance: process: ${frameTime} ${this._animationClip.startFrame} ${this._animationClip.endFrame}`);
        if (this._animationClip.endFrame < frameTime) frameTime = this._animationClip.endFrame;

        const frameRate = this._animationClip.frameRate;

        const animationTrackInstances = this._animationTrackInstances;
        for (let i = 0; i < animationTrackInstances.length; ++i) {
            const trackInstance = animationTrackInstances[i];
            const trackFrameRate = trackInstance.animationContainer.frameRate;
            const frameRateRatio = frameRate / trackFrameRate;

            animationTrackInstances[i].process(frameTime / frameRateRatio, unTrimmedFrameTime / frameRateRatio);
        }
    }
}

/*
// usage

new AnimationClipInstance(animationClip, [
    { trackName: "position", target: (value: Vector3) => this.transform.position.copy(value) },
    { trackName: "rotation", target: (value: Quaternion) => this.transform.rotation.copy(value) },
    { trackName: "scale", target: (value: Vector3) => this.transform.scale.copy(value) },
]);
*/

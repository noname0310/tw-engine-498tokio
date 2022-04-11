import { AnimationClip, InferedAnimationClipBindData, TrackData } from "../container/AnimationClip";
import { AnimationClipBindData, AnimationClipBindInfo } from "../AnimationClipBindInfo";
import { IAnimationInstance } from "./IAniamtionInstance";
import { IAnimationTrackInstance } from "./IAnimationTrackInstance";

export class AnimationClipInstance<T extends TrackData, U extends InferedAnimationClipBindData<T>> implements IAnimationInstance {
    private _bindInfo: AnimationClipBindInfo<U>;

    private readonly _animationClip: AnimationClip<T, U>;
    private _animationTrackInstances: IAnimationTrackInstance[];

    public constructor(animationClip: AnimationClip<T, U>, bindInfo: AnimationClipBindInfo<U>) {
        this._bindInfo = bindInfo;
        this._animationClip = animationClip;
        this._animationTrackInstances = [];
        const bindData = bindInfo.data as AnimationClipBindData;
        for (let i = 0; i < bindData.length; ++i) {
            const track = animationClip.getTrackFromName(bindData[i].trackName);
            if (track === null) {
                throw new Error(`AnimationClipInstance: track not found: ${bindData[i].trackName}`);
            }
            this._animationTrackInstances.push(track.createInstance(bindData[i].target as any) as IAnimationTrackInstance);
        }
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
            this._animationTrackInstances.push(track.createInstance(bindData[i].target as any) as IAnimationTrackInstance);
        }
    }

    public frameIndexHint(frameIndex: number): void {
        for (let i = 0; i < this._animationTrackInstances.length; ++i) {
            this._animationTrackInstances[i].frameIndexHint(frameIndex);
        }
    }

    public process(frameTime: number): void {
        if (frameTime < this._animationClip.startFrame) frameTime = this._animationClip.startFrame;
        if (this._animationClip.endFrame < frameTime) frameTime = this._animationClip.endFrame;

        for (let i = 0; i < this._animationTrackInstances.length; ++i) {
            this._animationTrackInstances[i].process(frameTime);
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
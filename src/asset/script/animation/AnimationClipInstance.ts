import { AnimationClip, InferedBindData, TrackData } from "./AnimationClip";
import { AnimationTrackInstance } from "./AnimationTrackInstance";
import { BindInfo } from "./BindInfo";

export class AnimationClipInstance<T extends TrackData, U extends InferedBindData<T>> {
    private _bindInfo: BindInfo<U>;

    private _animationClip: AnimationClip<T, U>;
    private _animationTrackInstances: AnimationTrackInstance<unknown>[];

    public constructor(animationClip: AnimationClip<T, U>, bindInfo: BindInfo<U>) {
        this._bindInfo = bindInfo;
        this._animationClip = animationClip;
        this._animationTrackInstances = [];
        const bindData = bindInfo.data;
        for (let i = 0; i < bindData.length; ++i) {
            const track = animationClip.getTrackFromName(bindData[i].trackName);
            if (track === null) {
                throw new Error(`AnimationClipInstance: track not found: ${bindData[i].trackName}`);
            }
            this._animationTrackInstances.push(new AnimationTrackInstance(track, bindData[i].target));
        }
    }

    public get bindInfo(): BindInfo<U> {
        return this._bindInfo;
    }

    public set bindInfo(bindInfo: BindInfo<U>) {
        this._animationTrackInstances = [];
        const bindData = bindInfo.data;
        for (let i = 0; i < bindData.length; ++i) {
            const track = this._animationClip.getTrackFromName(bindData[i].trackName);
            if (track === null) {
                throw new Error(`AnimationClipInstance: track not found: ${bindData[i].trackName}`);
            }
            this._animationTrackInstances.push(new AnimationTrackInstance(track, bindData[i].target));
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
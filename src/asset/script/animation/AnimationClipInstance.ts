import { AnimationClip } from "./AnimationClip";
import { AnimationTrackInstance } from "./AnimationTrackInstance";

export class AnimationClipInstance {
    private _animationClip: AnimationClip;
    private _animationTrackInstances: AnimationTrackInstance<unknown>[];

    public constructor(animationClip: AnimationClip, bindInfo: { trackName: string, target: (value: unknown) => void }[]) {
        this._animationClip = animationClip;
        this._animationTrackInstances = [];
        for (let i = 0; i < bindInfo.length; ++i) {
            const track = animationClip.getTrackFromName(bindInfo[i].trackName);
            if (track === null) {
                throw new Error(`AnimationClipInstance: track not found: ${bindInfo[i].trackName}`);
            }
            this._animationTrackInstances.push(new AnimationTrackInstance(track, bindInfo[i].target));
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
import { Component } from "the-world-engine";
import { AnimationTrack } from "./animation/AnimationTrack";
import { AnimationTrackInstance } from "./animation/AnimationTrackInstance";

export class AnimationTrackPlayer<T> extends Component {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|T|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _startTime: number = 0;
    private _elapsedTime: number = 0;
    private _frameRate: number = 60;

    public update() {
        if (!this._animationTrackInstace) return;

        this._elapsedTime = this.engine.time.time - this._startTime;
        const frame = Math.floor(this._elapsedTime / this._frameRate);
        this._animationTrackInstace.process(frame);
    }

    public play() {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");
        this._startTime = this.engine.time.time;
        this._elapsedTime = 0;
        this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
    }

    public stop() {
        this._animationTrackInstace = null;
    }

    public set animationTrack(animationTrack: AnimationTrack<T>) {
        this._animationTrack = animationTrack;
        if (!this._animationTarget || !this._isPlaying) return;
        this._animationTrackInstace = animationTrack.createInstance(this._animationTarget);
    }

    public set animationTarget(target: ((value: T) => void)|T) {
        this._animationTarget = target;
        if (!this._animationTrackInstace) return;
        this._animationTrackInstace.target = target;
    }
}

import { Component } from "the-world-engine";
import { AnimationTrack } from "./animation/AnimationTrack";
import { AnimationTrackInstance } from "./animation/AnimationTrackInstance";

export class AnimationTrackPlayer<T> extends Component {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _elapsedTime = 0;
    private _frameRate = 60;

    public update(): void {
        if (!this._animationTrackInstace) return;
        
        this._elapsedTime += this.engine.time.deltaTime;
        const frameTime = this._elapsedTime * this._frameRate;
        this._animationTrackInstace.process(frameTime);
    }

    public play(): void {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");
        this._elapsedTime = 0;
        this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
    }

    public stop(): void {
        this._animationTrackInstace = null;
    }

    public set animationTrack(animationTrack: AnimationTrack<T>) {
        this._animationTrack = animationTrack;
        if (!this._animationTarget || !this._animationTrackInstace) return;
        this._animationTrackInstace = animationTrack.createInstance(this._animationTarget);
    }

    public set animationTarget(targetSetFunction: (value: T) => void) {
        this._animationTarget = targetSetFunction;
        if (!this._animationTrackInstace) return;
        this._animationTrackInstace.targetSetFunction = targetSetFunction;
    }
}

import { Component } from "the-world-engine";
import { AnimationTrack } from "./animation/AnimationTrack";
import { AnimationTrackInstance } from "./animation/AnimationTrackInstance";

export class AnimationTrackPlayer<T> extends Component {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _elapsedTime = 0;
    private _frameRate = 60;
    private _isPlaying = false;
    private readonly _onAnimationProcessDeledate: ((frameTime: number) => void)[] = [];
    private readonly _onAnimationStartDelegate: (() => void)[] = [];
    private readonly _onAnimationEndDelegate: (() => void)[] = [];

    //#region events

    private invokeAnimationProcessDelegate(frameTime: number): void {
        for (let i = 0; i < this._onAnimationProcessDeledate.length; i++) {
            this._onAnimationProcessDeledate[i](frameTime);
        }
    }

    private invokeAnimationStartDelegate(): void {
        for (let i = 0; i < this._onAnimationStartDelegate.length; i++) {
            this._onAnimationStartDelegate[i]();
        }
    }

    private invokeAnimationEndDelegate(): void {
        for (let i = 0; i < this._onAnimationEndDelegate.length; i++) {
            this._onAnimationEndDelegate[i]();
        }
    }

    public addOnAnimationProcessListener(listener: (frameTime: number) => void): void {
        this._onAnimationProcessDeledate.push(listener);
    }

    public removeOnAnimationProcessListener(listener: (frameTime: number) => void): void {
        const index = this._onAnimationProcessDeledate.indexOf(listener);
        if (index === -1) return;
        this._onAnimationProcessDeledate.splice(index, 1);
    }

    public addOnAnimationStartListener(listener: () => void): void {
        this._onAnimationStartDelegate.push(listener);
    }

    public removeOnAnimationStartListener(listener: () => void): void {
        const index = this._onAnimationStartDelegate.indexOf(listener);
        if (index === -1) return;
        this._onAnimationStartDelegate.splice(index, 1);
    }

    public addOnAnimationEndListener(listener: () => void): void {
        this._onAnimationEndDelegate.push(listener);
    }

    public removeOnAnimationEndListener(listener: () => void): void {
        const index = this._onAnimationEndDelegate.indexOf(listener);
        if (index === -1) return;
        this._onAnimationEndDelegate.splice(index, 1);
    }

    //#endregion events

    public update(): void {
        if (!this._animationTrackInstace || !this._isPlaying) return;
        
        this._elapsedTime += this.engine.time.deltaTime;
        const frameTime = this._elapsedTime * this._frameRate;
        this._animationTrackInstace.process(frameTime);
        this.invokeAnimationProcessDelegate(frameTime);
    }

    public play(): void {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");
        this._elapsedTime = 0;
        this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        this._isPlaying = true;
        this.invokeAnimationStartDelegate();
    }

    public stop(): void {
        this._isPlaying = false;
        this.invokeAnimationEndDelegate();
    }

    public process(frameTime: number): void {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");

        if (!this._animationTrackInstace) {
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        }
        this._animationTrackInstace.process(frameTime);
        this.invokeAnimationProcessDelegate(frameTime);
    }

    public get animationTrack(): AnimationTrack<T>|null {
        return this._animationTrack;
    }

    public set animationTrack(animationTrack: AnimationTrack<T>|null) {
        this._animationTrack = animationTrack;
        if (!animationTrack) return;
        if (!this._animationTarget || !this._animationTrackInstace) return;
        this._animationTrackInstace = animationTrack.createInstance(this._animationTarget);
    }

    public set animationTarget(targetSetFunction: (value: T) => void) {
        this._animationTarget = targetSetFunction;
        if (!this._animationTrackInstace) return;
        this._animationTrackInstace.targetSetFunction = targetSetFunction;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }
}

import { Component } from "the-world-engine";
import { AnimationTrack } from "./animation/AnimationTrack";
import { AnimationTrackInstance } from "./animation/AnimationTrackInstance";

export const enum AnimationLoopMode {
    None,
    Loop
}

export class AnimationTrackPlayer<T> extends Component {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _elapsedTime = 0;
    private _frameRate = 60;
    private _isPlaying = false;
    private _loopMode = AnimationLoopMode.None;
    private readonly _onAnimationProcessDeledate: ((frameTime: number) => void)[] = [];
    private readonly _onAnimationStartDelegate: (() => void)[] = [];
    private readonly _onAnimationPausedDelegate: (() => void)[] = [];
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

    private invokeAnimationPausedDelegate(): void {
        for (let i = 0; i < this._onAnimationPausedDelegate.length; i++) {
            this._onAnimationPausedDelegate[i]();
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

    public addOnAnimationPausedListener(listener: () => void): void {
        this._onAnimationPausedDelegate.push(listener);
    }

    public removeOnAnimationPausedListener(listener: () => void): void {
        const index = this._onAnimationPausedDelegate.indexOf(listener);
        if (index === -1) return;
        this._onAnimationPausedDelegate.splice(index, 1);
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
        const frame = Math.floor(frameTime);
        this._animationTrackInstace.process(frame);
        this.invokeAnimationProcessDelegate(frame);
        if (this._animationTrack!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            } else {
                this._elapsedTime = frameTime % this._animationTrack!.endFrame;
            }
        }
    }

    public play(): void {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");
        this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        this._isPlaying = true;
        this.invokeAnimationStartDelegate();
    }

    public pause(): void {
        this._isPlaying = false;
        this.invokeAnimationPausedDelegate();
    }

    public stop(): void {
        this._isPlaying = false;
        this._elapsedTime = 0;
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

    public get loopMode(): AnimationLoopMode {
        return this._loopMode;
    }

    public set loopMode(loopMode: AnimationLoopMode) {
        this._loopMode = loopMode;
    }

    public get elapsedTime(): number {
        return this._elapsedTime;
    }

    public set elapsedTime(elapsedTime: number) {
        this._elapsedTime = elapsedTime;
    }

    public get frameTime(): number {
        return this._elapsedTime * this._frameRate;
    }
    
    public set frameTime(frameTime: number) {
        this._elapsedTime = frameTime / this._frameRate;
    }

    public get frameRate(): number {
        return this._frameRate;
    }

    public set frameRate(frameRate: number) {
        this._frameRate = frameRate;
    }
}

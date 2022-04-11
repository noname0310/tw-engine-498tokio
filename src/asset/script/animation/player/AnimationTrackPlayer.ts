import { Component, EventContainer, IEventContainer } from "the-world-engine";
import { AnimationTrack } from "../container/AnimationTrack";
import { AnimationTrackInstance } from "../instance/AnimationTrackInstance";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { IAnimationPlayer } from "../player/IAnimationPlayer";

export class AnimationTrackPlayer<T> extends Component implements IAnimationPlayer {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _elapsedTime = 0;
    private _frameRate = 60;
    private _isPlaying = false;
    private _loopMode = AnimationLoopMode.None;
    private readonly _onAnimationProcessEvent = new EventContainer<(frameTime: number) => void>();
    private readonly _onAnimationStartEvent = new EventContainer<() => void>();
    private readonly _onAnimationPausedEvent = new EventContainer<() => void>();
    private readonly _onAnimationEndEvent = new EventContainer<() => void>();

    public get onAnimationProcess(): IEventContainer<(frameTime: number) => void> {
        return this._onAnimationProcessEvent;
    }

    public get onAnimationStart(): IEventContainer<() => void> {
        return this._onAnimationStartEvent;
    }

    public get onAnimationPaused(): IEventContainer<() => void> {
        return this._onAnimationPausedEvent;
    }

    public get onAnimationEnd(): IEventContainer<() => void> {
        return this._onAnimationEndEvent;
    }

    public update(): void {
        if (!this._animationTrackInstace || !this._isPlaying) return;
        
        this._elapsedTime += this.engine.time.deltaTime;
        let frameTime = this._elapsedTime * this._frameRate;
        if (this._animationTrack!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            } else {
                this._elapsedTime = (frameTime % this._animationTrack!.endFrame) / this._frameRate;
                this._animationTrackInstace.frameIndexHint(0);
                frameTime = this._elapsedTime * this._frameRate;
                const frame = Math.floor(frameTime);
                this._animationTrackInstace.process(frame);
                this._onAnimationProcessEvent.invoke(frame);
            }
        } else {
            const frame = Math.floor(frameTime);
            this._animationTrackInstace.process(frame);
            this._onAnimationProcessEvent.invoke(frame);
        }
    }

    public play(): void {
        if (this._isPlaying) return;
        if (!this._animationTrackInstace) {
            if (!this._animationTrack) throw new Error("animationTrack is not set");
            if (!this._animationTarget) throw new Error("animationTarget is not set");
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        }
        this._isPlaying = true;
        this._onAnimationStartEvent.invoke();
    }

    public pause(): void {
        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._onAnimationPausedEvent.invoke();
    }

    public stop(): void {
        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._elapsedTime = 0;
        this._onAnimationEndEvent.invoke();
    }

    public process(frameTime: number): void {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");

        if (!this._animationTrackInstace) {
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        }
        this._animationTrackInstace.process(frameTime);
        this._onAnimationProcessEvent.invoke(frameTime);
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

    public get animationContainer(): AnimationTrack<T>|null {
        return this._animationTrack;
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

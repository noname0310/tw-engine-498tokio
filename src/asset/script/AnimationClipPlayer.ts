import { Component, EventContainer, IEventContainer } from "the-world-engine";
import { AnimationClip } from "./animation/AnimationClip";
import { AnimationClipInstance } from "./animation/AnimationClipInstance";
import { BindInfo } from "./animation/BindInfo";
import { AnimationLoopMode } from "./AnimationLoopMode";
import { IAnimationPlayer } from "./IAnimationPlayer";

export class AnimationClipPlayer extends Component implements IAnimationPlayer {
    private _animationClip: AnimationClip|null = null;
    private _bindInfo: BindInfo|null = null;
    private _animationClipInstace: AnimationClipInstance|null = null;
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
        if (!this._animationClipInstace || !this._isPlaying) return;
        
        this._elapsedTime += this.engine.time.deltaTime;
        const frameTime = this._elapsedTime * this._frameRate;
        const frame = Math.floor(frameTime);
        this._animationClipInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frame);
        if (this._animationClip!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            } else {
                this._elapsedTime = (frameTime % this._animationClip!.endFrame) / this._frameRate;
                this._animationClipInstace.frameIndexHint(0);
            }
        }
    }

    public play(): void {
        if (!this._animationClip) throw new Error("animationTrack is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");
        this._animationClipInstace = this._animationClip.createInstance(this._bindInfo);
        this._isPlaying = true;
        this._onAnimationStartEvent.invoke();
    }

    public pause(): void {
        this._isPlaying = false;
        this._onAnimationPausedEvent.invoke();
    }

    public stop(): void {
        this._isPlaying = false;
        this._elapsedTime = 0;
        this._onAnimationEndEvent.invoke();
    }

    public process(frameTime: number): void {
        if (!this._animationClip) throw new Error("animationClip is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationClipInstace) {
            this._animationClipInstace = this._animationClip.createInstance(this._bindInfo);
        }
        this._animationClipInstace.process(frameTime);
        this._onAnimationProcessEvent.invoke(frameTime);
    }

    public get animationClip(): AnimationClip|null {
        return this._animationClip;
    }

    public set animationClip(animationClip: AnimationClip|null) {
        this._animationClip = animationClip;
        if (!animationClip) return;
        if (!this._bindInfo || !this._animationClipInstace) return;
        this._animationClipInstace = animationClip.createInstance(this._bindInfo);
    }

    public get animationContainer(): AnimationClip|null {
        return this._animationClip;
    }

    public set bindInfo(bindInfo: BindInfo) {
        this._bindInfo = bindInfo;
        if (!this._animationClipInstace) return;
        this._animationClipInstace.bindInfo = bindInfo;
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

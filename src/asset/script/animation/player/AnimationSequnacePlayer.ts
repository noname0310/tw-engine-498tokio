import { Component, EventContainer, IEventContainer } from "the-world-engine";
import { AnimationSequence, ContainerData, InferedSequenceBindData, SequenceBindInfo } from "../container/AnimationSequence";
import { AnimationSequenceInstance } from "../instance/AnimationSequenceInstance";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { IAnimationPlayer } from "../player/IAnimationPlayer";

export class AnimationSequnacePlayer extends Component implements IAnimationPlayer {
    private _animationSequnace: AnimationSequence<any, any>|null = null;
    private _bindInfo: SequenceBindInfo|null = null;
    private _animationSequanceInstace: AnimationSequenceInstance<any, any>|null = null;
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
        if (!this._animationSequanceInstace || !this._isPlaying) return;

        this._elapsedTime += this.engine.time.deltaTime;
        let frameTime = this._elapsedTime * this._frameRate;
        if (this._animationSequnace!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            } else {
                this._elapsedTime = (frameTime % this._animationSequnace!.endFrame) / this._frameRate;
                this._animationSequanceInstace.frameIndexHint(0);
                frameTime = this._elapsedTime * this._frameRate;
                const frame = Math.floor(frameTime);
                this._animationSequanceInstace.process(frame);
                this._onAnimationProcessEvent.invoke(frame);
            }
        } else {
            const frame = Math.floor(frameTime);
            this._animationSequanceInstace.process(frame);
            this._onAnimationProcessEvent.invoke(frame);
        }
    }

    public play(): void {
        if (this._isPlaying) return;
        if (!this._animationSequanceInstace) {
            if (!this._animationSequnace) throw new Error("animationSequnace is not set");
            if (!this._bindInfo) throw new Error("bindInfo is not set");
            this._animationSequanceInstace = this._animationSequnace.createInstance(this._bindInfo);
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
        if (!this._animationSequnace) throw new Error("animationSequnace is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationSequanceInstace) {
            this._animationSequanceInstace = this._animationSequnace.createInstance(this._bindInfo);
        }
        this._animationSequanceInstace.process(frameTime);
        this._onAnimationProcessEvent.invoke(frameTime);
    }

    public get animationSequnace(): AnimationSequence<any, any>|null {
        return this._animationSequnace;
    }

    public get animationContainer(): AnimationSequence<any, any>|null {
        return this._animationSequnace;
    }

    public setAnimationAndBind<T extends ContainerData, U extends InferedSequenceBindData<T>>(animationSequnace: AnimationSequence<T, U>, bindInfo: U): void {
        this._animationSequnace = animationSequnace;
        this._bindInfo = bindInfo;
        if (!this._animationSequanceInstace) return;
        this._animationSequanceInstace.bindInfo = bindInfo;
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

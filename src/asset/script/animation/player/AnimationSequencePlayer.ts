import { Component, EventContainer, IEventContainer } from "the-world-engine";

import { IAnimationClock } from "../../IAnimationClock";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { AnimationSequence, ContainerData, InferedSequenceBindData, SequenceBindInfo } from "../container/AnimationSequence";
import { AnimationSequenceInstance } from "../instance/AnimationSequenceInstance";
import { IAnimationPlayer } from "./IAnimationPlayer";

export class AnimationSequencePlayer extends Component implements IAnimationPlayer {
    private _animationSequence: AnimationSequence<any, any>|null = null;
    private _bindInfo: SequenceBindInfo|null = null;
    private _animationSequenceInstace: AnimationSequenceInstance<any, any>|null = null;
    private _elapsedTime = 0;
    private _isPlaying = false;
    private _loopMode = AnimationLoopMode.None;
    private _animationClock: IAnimationClock|null = null;
    private readonly _onAnimationProcessEvent = new EventContainer<(frameTime: number) => void>();
    private readonly _onAnimationStartEvent = new EventContainer<() => void>();
    private readonly _onAnimationPausedEvent = new EventContainer<() => void>();
    private readonly _onAnimationEndEvent = new EventContainer<() => void>();
    private readonly _onAnimationChangedEvent = new EventContainer<(animationSequence: AnimationSequence<any, any>|null) => void>();

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

    public get onAnimationChanged(): IEventContainer<(animationSequence: AnimationSequence<any, any>|null) => void> {
        return this._onAnimationChangedEvent;
    }

    public onDestroy(): void {
        const animationClock = this._animationClock;
        if (animationClock) {
            animationClock.onPlayed.removeListener(this.playByClock);
            animationClock.onPaused.removeListener(this.pauseByClock);
            animationClock.onStopped.removeListener(this.stopByClock);
            animationClock.onJumped.removeListener(this.processByClock);
        }
    }

    public update(): void {
        if (!this._animationSequenceInstace || !this._isPlaying) return;

        const frameRate = this._animationSequence!.frameRate;

        if (this._animationClock) {
            this._elapsedTime = this._animationClock.currentTime;
        } else {
            this._elapsedTime += this.engine.time.deltaTime;
        }
        let frameTime = this._elapsedTime * frameRate;
        if (this._animationSequence!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.Loop) {
                this._elapsedTime = (frameTime % this._animationSequence!.endFrame) / frameRate;
                this._animationSequenceInstace.frameIndexHint(0);
            }

            if (this._animationClock) {
                this._animationClock.setPosition(this._elapsedTime);
            } else {
                frameTime = this._elapsedTime * frameRate;
                const frame = Math.floor(frameTime);
                this._animationSequenceInstace.process(frame);
                this._onAnimationProcessEvent.invoke(frameTime);
            }

            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            }
        } else {
            const frame = Math.floor(frameTime);
            this._animationSequenceInstace.process(frame);
            this._onAnimationProcessEvent.invoke(frameTime);
        }
    }

    public play(): void {
        if (this._isPlaying) return;
        if (!this._animationSequenceInstace) {
            if (!this._animationSequence) throw new Error("animationSequence is not set");
            if (!this._bindInfo) throw new Error("bindInfo is not set");
            this._animationSequenceInstace = this._animationSequence.createInstance(this._bindInfo);
        }

        if (this._animationClock) {
            this._animationClock.play();
            return;
        }

        this._isPlaying = true;
        this._onAnimationStartEvent.invoke();
    }

    public readonly playByClock = (): void => {
        this._isPlaying = true;
        this._onAnimationStartEvent.invoke();
    };

    public pause(): void {
        if (this._animationClock) {
            this._animationClock.pause();
            return;
        }

        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._onAnimationPausedEvent.invoke();
    }

    public readonly pauseByClock = (): void => {
        this.processByClock(this._animationClock!.currentTime);
        this._isPlaying = false;
        this._onAnimationPausedEvent.invoke();
    };

    public stop(): void {
        if (this._animationClock) {
            this._animationClock.stop();
            return;
        }

        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._elapsedTime = 0;
        this._onAnimationEndEvent.invoke();
    }

    public readonly stopByClock = (): void => {
        this._isPlaying = false;
        this._elapsedTime = 0;
        this._onAnimationEndEvent.invoke();
    };

    public process(frameTime: number): void {
        if (!this._animationSequence) throw new Error("animationSequence is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationSequenceInstace) {
            this._animationSequenceInstace = this._animationSequence.createInstance(this._bindInfo);
        }

        if (this._animationClock) {
            const frameRate = this._animationSequence.frameRate;
            this._animationClock.setPosition(frameTime / frameRate);
            return;
        }

        const frame = Math.floor(frameTime);
        this._animationSequenceInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    }

    public readonly processByClock = (time: number): void => {
        if (!this._animationSequence) throw new Error("animationSequence is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationSequenceInstace) {
            this._animationSequenceInstace = this._animationSequence.createInstance(this._bindInfo);
        }

        const frameRate = this._animationSequence.frameRate;
        const frameTime = time * frameRate;
        const frame = Math.floor(frameTime);
        this._animationSequenceInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    };

    public get animationSequence(): AnimationSequence<any, any>|null {
        return this._animationSequence;
    }

    public get animationContainer(): AnimationSequence<any, any>|null {
        return this._animationSequence;
    }

    public setAnimationAndBind<T extends ContainerData, U extends InferedSequenceBindData<T>>(animationSequence: AnimationSequence<T, U>, bindInfo: U): void {
        if (this._animationSequence === animationSequence) {
            this._bindInfo = bindInfo;

            if (this._animationSequenceInstace) {
                this._animationSequenceInstace.bindInfo = bindInfo;
            }
        } else {
            this._animationSequence = animationSequence;
            this._bindInfo = bindInfo;

            if (this._animationSequenceInstace) {
                this._animationSequenceInstace = animationSequence.createInstance(bindInfo);
            }
        }

        this._onAnimationChangedEvent.invoke(animationSequence);
    }

    public clearAnimation(): void {
        this._animationSequence = null;
        this._bindInfo = null;
        this._animationSequenceInstace = null;
        this._onAnimationChangedEvent.invoke(null);
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
        return this._animationClock ? this._animationClock.currentTime : this._elapsedTime;
    }

    public set elapsedTime(elapsedTime: number) {
        this._elapsedTime = elapsedTime;
        this._animationClock?.setPosition(elapsedTime);
    }

    public get frameTime(): number {
        if (!this._animationSequence) throw new Error("animationSequence is not set");
        return this._elapsedTime * this._animationSequence.frameRate;
    }

    public set frameTime(frameTime: number) {
        if (!this._animationSequence) throw new Error("animationSequence is not set");
        this.elapsedTime = frameTime / this._animationSequence.frameRate;
    }

    public get animationClock(): IAnimationClock|null {
        return this._animationClock;
    }

    public set animationClock(animationClock: IAnimationClock|null) {
        const oldClock = this._animationClock;
        if (oldClock) {
            oldClock.onPlayed.removeListener(this.playByClock);
            oldClock.onPaused.removeListener(this.pauseByClock);
            oldClock.onStopped.removeListener(this.stopByClock);
            oldClock.onJumped.removeListener(this.processByClock);
        }

        this._animationClock = animationClock;

        if (animationClock) {
            animationClock.onPlayed.addListener(this.playByClock);
            animationClock.onPaused.addListener(this.pauseByClock);
            animationClock.onStopped.addListener(this.stopByClock);
            animationClock.onJumped.addListener(this.processByClock);
        }
    }
}

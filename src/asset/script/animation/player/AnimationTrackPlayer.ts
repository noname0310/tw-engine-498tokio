import { Component, EventContainer, IEventContainer } from "the-world-engine";

import { IAnimationClock } from "../../IAnimationClock";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { AnimationTrack } from "../container/AnimationTrack";
import { AnimationTrackInstance } from "../instance/AnimationTrackInstance";
import { IAnimationPlayer } from "../player/IAnimationPlayer";

export class AnimationTrackPlayer<T> extends Component implements IAnimationPlayer {
    private _animationTrack: AnimationTrack<T>|null = null;
    private _animationTarget: ((value: T) => void)|null = null;
    private _animationTrackInstace: AnimationTrackInstance<T>|null = null;
    private _elapsedTime = 0;
    private _isPlaying = false;
    private _loopMode = AnimationLoopMode.None;
    private _animationClock: IAnimationClock|null = null;
    private readonly _onAnimationProcessEvent = new EventContainer<(frameTime: number) => void>();
    private readonly _onAnimationStartEvent = new EventContainer<() => void>();
    private readonly _onAnimationPausedEvent = new EventContainer<() => void>();
    private readonly _onAnimationEndEvent = new EventContainer<() => void>();
    private readonly _onAnimationChangedEvent = new EventContainer<(animationTrack: AnimationTrack<T>|null) => void>();

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

    public get onAnimationChanged(): IEventContainer<(animationTrack: AnimationTrack<T>|null) => void> {
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
        if (!this._animationTrackInstace || !this._isPlaying) return;

        const frameRate = this._animationTrack!.frameRate;

        if (this._animationClock) {
            this._elapsedTime = this._animationClock.currentTime;
        } else {
            this._elapsedTime += this.engine.time.deltaTime;
        }
        let frameTime = this._elapsedTime * frameRate;
        if (this._animationTrack!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.Loop) {
                this._elapsedTime = (frameTime % this._animationTrack!.endFrame) / frameRate;
                this._animationTrackInstace.frameIndexHint(0);
            }

            if (this._animationClock) {
                this._animationClock.setPosition(this._elapsedTime);
            } else {
                frameTime = this._elapsedTime * frameRate;
                const frame = Math.floor(frameTime);
                this._animationTrackInstace.process(frame);
                this._onAnimationProcessEvent.invoke(frameTime);
            }

            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            }
        } else {
            const frame = Math.floor(frameTime);
            this._animationTrackInstace.process(frame);
            this._onAnimationProcessEvent.invoke(frameTime);
        }
    }

    public play(): void {
        if (this._isPlaying) return;
        if (!this._animationTrackInstace) {
            if (!this._animationTrack) throw new Error("animationTrack is not set");
            if (!this._animationTarget) throw new Error("animationTarget is not set");
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
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
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");

        if (!this._animationTrackInstace) {
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        }

        if (this._animationClock) {
            const frameRate = this._animationTrack.frameRate;
            this._animationClock.setPosition(frameTime / frameRate);
            return;
        }

        const frame = Math.floor(frameTime);
        this._animationTrackInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    }

    public readonly processByClock = (time: number): void => {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        if (!this._animationTarget) throw new Error("animationTarget is not set");

        if (!this._animationTrackInstace) {
            this._animationTrackInstace = this._animationTrack.createInstance(this._animationTarget);
        }

        const frameRate = this._animationTrack.frameRate;
        const frameTime = time * frameRate;
        const frame = Math.floor(frameTime);
        this._animationTrackInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    };

    public get animationTrack(): AnimationTrack<T>|null {
        return this._animationTrack;
    }

    public set animationTrack(animationTrack: AnimationTrack<T>|null) {
        this._animationTrack = animationTrack;
        if (!animationTrack) return;
        if (!this._animationTarget || !this._animationTrackInstace) return;
        this._animationTrackInstace = animationTrack.createInstance(this._animationTarget);

        this._onAnimationChangedEvent.invoke(animationTrack);
    }

    public get animationContainer(): AnimationTrack<T>|null {
        return this._animationTrack;
    }

    public set animationTarget(targetSetFunction: (value: T) => void) {
        this._animationTarget = targetSetFunction;
        if (!this._animationTrackInstace) return;
        this._animationTrackInstace.targetSetFunction = targetSetFunction;
    }

    public clearAnimationTarget(): void {
        this._animationTarget = null;
        this._animationTrackInstace = null;
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
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        return this._elapsedTime * this._animationTrack.frameRate;
    }

    public set frameTime(frameTime: number) {
        if (!this._animationTrack) throw new Error("animationTrack is not set");
        this.elapsedTime = frameTime / this._animationTrack.frameRate;
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

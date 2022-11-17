import { Component, EventContainer, IEventContainer } from "the-world-engine";
import { AnimationClip, InferedAnimationClipBindData, TrackData } from "../container/AnimationClip";
import { AnimationClipInstance } from "../instance/AnimationClipInstance";
import { AnimationClipBindInfo } from "../bind/AnimationClipBindInfo";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { IAnimationPlayer } from "./IAnimationPlayer";
import { IAnimationClock } from "../../IAnimationClock";

// type UnwrapAnimationClip<T extends AnimationClip<any, any>> = T extends AnimationClip<infer U, any> ? U : never;

// // type unwrapTest = UnwrapAnimationClip<AnimationClip<TrackData, any>>;

// export class AnimationClipBind<T extends TrackData, U extends InferedBindData<T>> {
//     public readonly clip: AnimationClip<T, U>;
//     private _bind: BindInfo<U>;

//     public constructor(clip: AnimationClip<T, U>, bind: BindInfo<U>) {
//         this.clip = clip;
//         this._bind = bind;
//     }

//     public get bindInfo(): BindInfo<U> {
//         return this._bind;
//     }
// }

export class AnimationClipPlayer extends Component implements IAnimationPlayer {
    private _animationClip: AnimationClip<any, any>|null = null;
    private _bindInfo: AnimationClipBindInfo<any>|null = null;
    private _animationClipInstace: AnimationClipInstance<any, any>|null = null;
    private _elapsedTime = 0;
    private _isPlaying = false;
    private _loopMode = AnimationLoopMode.None;
    private readonly _onAnimationProcessEvent = new EventContainer<(frameTime: number) => void>();
    private readonly _onAnimationStartEvent = new EventContainer<() => void>();
    private readonly _onAnimationPausedEvent = new EventContainer<() => void>();
    private readonly _onAnimationEndEvent = new EventContainer<() => void>();
    private readonly _onAnimationChangedEvent = new EventContainer<(animationClip: AnimationClip<any, any>|null) => void>();
    private _animationClock: IAnimationClock|null = null;

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

    public get onAnimationChanged(): IEventContainer<(animationClip: AnimationClip<any, any>|null) => void> {
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
        if (!this._animationClipInstace || !this._isPlaying) return;

        const frameRate = this._animationClip!.frameRate;
        
        if (this._animationClock) {
            this._elapsedTime = this._animationClock.currentTime;
        } else {
            this._elapsedTime += this.engine.time.deltaTime;
        }
        let frameTime = this._elapsedTime * frameRate;
        if (this._animationClip!.endFrame < frameTime) {
            if (this._loopMode === AnimationLoopMode.Loop) {
                this._elapsedTime = (frameTime % this._animationClip!.endFrame) / frameRate;
                this._animationClipInstace.frameIndexHint(0);
            }
        
            if (this._animationClock) {
                this._animationClock.setPosition(this._elapsedTime);
            } else {
                frameTime = this._elapsedTime * frameRate;
                const frame = Math.floor(frameTime);
                this._animationClipInstace.process(frame);
                this._onAnimationProcessEvent.invoke(frameTime);
            }

            if (this._loopMode === AnimationLoopMode.None) {
                this.stop();
            }
        } else {
            const frame = Math.floor(frameTime);
            this._animationClipInstace.process(frame);
            this._onAnimationProcessEvent.invoke(frameTime);
        }
    }

    public play(): void {
        if (this._isPlaying) return;
        if (!this._animationClipInstace) {
            if (!this._animationClip) throw new Error("animationClip is not set");
            if (!this._bindInfo) throw new Error("bindInfo is not set");
            this._animationClipInstace = this._animationClip.createInstance(this._bindInfo);
        }
        
        if (this._animationClock) {
            this._animationClock.play();
            return;
        }

        this._isPlaying = true;
        this._onAnimationStartEvent.invoke();
    }

    public playByClock = () => {
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

    public pauseByClock = (): void => {
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

    public stopByClock = (): void => {
        this._isPlaying = false;
        this._elapsedTime = 0;
        this._onAnimationEndEvent.invoke();
    };

    public process(frameTime: number): void {
        if (!this._animationClip) throw new Error("animationClip is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationClipInstace) {
            this._animationClipInstace = this._animationClip.createInstance(this._bindInfo);
        }

        if (this._animationClock) {
            const frameRate = this._animationClip.frameRate;
            this._animationClock.setPosition(frameTime / frameRate);
            return;
        }

        const frame = Math.floor(frameTime);
        this._animationClipInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    }

    public processByClock = (time: number): void => {
        if (!this._animationClip) throw new Error("animationClip is not set");
        if (!this._bindInfo) throw new Error("bindInfo is not set");

        if (!this._animationClipInstace) {
            this._animationClipInstace = this._animationClip.createInstance(this._bindInfo);
        }

        const frameRate = this._animationClip.frameRate;
        const frameTime = time * frameRate;
        const frame = Math.floor(frameTime);
        this._animationClipInstace.process(frame);
        this._onAnimationProcessEvent.invoke(frameTime);
    };

    public get animationClip(): AnimationClip<any, any>|null {
        return this._animationClip;
    }

    public get animationContainer(): AnimationClip<any, any>|null {
        return this._animationClip;
    }

    public setAnimationAndBind<T extends TrackData, U extends InferedAnimationClipBindData<T>>(animationClip: AnimationClip<T, U>, bindInfo: AnimationClipBindInfo<U>) {
        if (this._animationClip === animationClip) {
            this._bindInfo = bindInfo;

            if (this._animationClipInstace) {
                this._animationClipInstace.bindInfo = bindInfo;
            }
        } else {
            this._animationClip = animationClip;
            this._bindInfo = bindInfo;
            
            if (this._animationClipInstace) {
                this._animationClipInstace = animationClip.createInstance(bindInfo);
            }
        }

        this._onAnimationChangedEvent.invoke(animationClip);
    }

    public clearAnimation(): void {
        this._animationClip = null;
        this._bindInfo = null;
        this._animationClipInstace = null;
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
        if (!this._animationClip) throw new Error("animationClip is not set");
        return this._elapsedTime * this._animationClip.frameRate;
    }
    
    public set frameTime(frameTime: number) {
        if (!this._animationClip) throw new Error("animationClip is not set");
        this.elapsedTime = frameTime / this._animationClip.frameRate;
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

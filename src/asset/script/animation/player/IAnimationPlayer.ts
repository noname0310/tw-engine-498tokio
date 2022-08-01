import { IEventContainer } from "the-world-engine";
import { IAnimationContainer } from "../container/IAnimationContainer";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { IAnimationClock } from "../../IAnimationClock";

export interface IAnimationPlayer {
    get onAnimationProcess(): IEventContainer<(frameTime: number) => void>;

    get onAnimationStart(): IEventContainer<() => void>;

    get onAnimationPaused(): IEventContainer<() => void>;

    get onAnimationEnd(): IEventContainer<() => void>;

    get onAnimationChanged(): IEventContainer<(animationContainer: IAnimationContainer<unknown>) => void>;

    play(): void;

    pause(): void;

    stop(): void;

    process(frameTime: number): void;

    get animationContainer(): IAnimationContainer<unknown>|null

    get isPlaying(): boolean;

    get loopMode(): AnimationLoopMode;

    set loopMode(loopMode: AnimationLoopMode);

    get elapsedTime(): number;

    set elapsedTime(elapsedTime: number);

    get frameTime(): number;
    
    set frameTime(frameTime: number);

    get frameRate(): number;

    set frameRate(frameRate: number);

    get animationClock(): IAnimationClock|null;

    set animationClock(animationClock: IAnimationClock|null);
}

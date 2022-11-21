import { IEventContainer } from "the-world-engine";

import { IAnimationClock } from "../../IAnimationClock";
import { AnimationLoopMode } from "../AnimationLoopMode";
import { IAnimationContainer } from "../container/IAnimationContainer";

export interface IAnimationPlayer {
    get onAnimationProcess(): IEventContainer<(frameTime: number) => void>;

    get onAnimationStart(): IEventContainer<() => void>;

    get onAnimationPaused(): IEventContainer<() => void>;

    get onAnimationEnd(): IEventContainer<() => void>;

    get onAnimationChanged(): IEventContainer<(animationContainer: IAnimationContainer<unknown>|null) => void>;

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

    get animationClock(): IAnimationClock|null;

    set animationClock(animationClock: IAnimationClock|null);
}

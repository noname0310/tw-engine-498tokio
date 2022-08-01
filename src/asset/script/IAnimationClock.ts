import { IEventContainer } from "the-world-engine";
import { IClock } from "./IClock";

export interface IAnimationClock extends IClock {
    get playbackRate(): number;
    set playbackRate(value: number);
    get onPlayed(): IEventContainer<() => void>;
    get onPaused(): IEventContainer<() => void>;
    get onStopped(): IEventContainer<() => void>;
    get onJumped(): IEventContainer<(time: number) => void>;

    play(): void;
    pause(): void;
    stop(): void;
    setPosition(position: number): void;
}

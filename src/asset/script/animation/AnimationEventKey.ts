import { IAnimationKey } from "./IAnimationKey";

export class AnimationEventBindInfo {
    public readonly event: () => void;
    public readonly eventRestore?: () => void;

    public constructor(event: () => void, eventRestore?: () => void) {
        this.event = event;
        this.eventRestore = eventRestore;
    }
}

export class AnimationEventKey<T extends string> implements IAnimationKey {
    public readonly eventName: T;
    public readonly frame: number;

    public constructor(eventName: string extends T ? never : T, frame: number) {
        this.eventName = eventName;
        this.frame = frame;
    }
}

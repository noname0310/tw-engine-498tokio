import { IAnimationContainer } from "../container/IAnimationContainer";

export interface IAnimationInstance {
    get animationContainer(): IAnimationContainer<unknown>;
    frameIndexHint(frameIndex: number): void;
    process(frameTime: number): void;
}

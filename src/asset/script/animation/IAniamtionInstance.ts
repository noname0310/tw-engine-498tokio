export interface IAnimationInstance {
    frameIndexHint(frameIndex: number): void;
    process(frameTime: number): void;
}

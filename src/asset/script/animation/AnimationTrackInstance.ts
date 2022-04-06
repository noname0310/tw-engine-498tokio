import { AnimationTrack } from "./AnimationTrack";

const enum TargetKind {
    SetFunction, // this can be used to Vector3, Vector2, and so on...
    Reference
}

export class AnimationTrackInstance<T> {
    private _target: ((value: T) => void)|T;
    private _targetType: TargetKind;

    private _currentFrameIndex: number;
    private _animationTrack: AnimationTrack<T>;

    public constructor(animationTrack: AnimationTrack<T>, target: T);
    
    public constructor(animationTrack: AnimationTrack<T>, target: (value: T) => void);

    public constructor(animationTrack: AnimationTrack<T>, target: ((value: T) => void)|T) {
        this._animationTrack = animationTrack;
        this._target = target;
        this._targetType = typeof target === "function" ? TargetKind.SetFunction : TargetKind.Reference;
        this._currentFrameIndex = 0;
    }

    public process(frame: number) {
        throw new Error("not implemented");
    }
}

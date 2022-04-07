import { InterpolationKind } from "./AnimationKey";
import { AnimationTrack } from "./AnimationTrack";

export class AnimationTrackInstance<T> {
    private _targetSetFunction: (value: T) => void;

    private _currentFrameIndex: number;
    private readonly _animationTrack: AnimationTrack<T>;

    public constructor(animationTrack: AnimationTrack<T>, targetSetFunction: (value: T) => void) {
        this._animationTrack = animationTrack;
        this._targetSetFunction = targetSetFunction;
        this._currentFrameIndex = 0;
    }

    public set targetSetFunction(targetSetFunction: (value: T) => void) {
        this._targetSetFunction = targetSetFunction;
    }

    public get targetSetFunction(): (value: T) => void {
        return this._targetSetFunction;
    }

    public process(frameTime: number): void {
        const keys = this._animationTrack.keys;
        
        if (keys.length === 0) return;
        if (keys.length === 1) {
            this._targetSetFunction(keys[0].value);
            return;
        }

        let startKeyIndex = this._currentFrameIndex;

        while (0 <= startKeyIndex && frameTime <= keys[startKeyIndex].frame) startKeyIndex -= 1;
        while (startKeyIndex < keys.length - 1 && frameTime > keys[startKeyIndex + 1].frame) startKeyIndex += 1;

        this._currentFrameIndex = startKeyIndex;

        const startKey = keys[startKeyIndex];
        const endKey = keys[startKeyIndex + 1];
        
        if (startKey === undefined) {
            this._targetSetFunction(endKey.value);
            return;
        }

        if (endKey === undefined) {
            this._targetSetFunction(startKey.value);
            return;
        }

        if (startKey.interpolation === InterpolationKind.Step) {
            this._targetSetFunction(startKey.value);
            return;
        }

        const interpolator = this._animationTrack.interpolator;
        const gradient = (frameTime - startKey.frame) / (endKey.frame - startKey.frame);
        
        if (startKey.interpolation === InterpolationKind.Linear) {
            const value = interpolator.lerp(startKey.value, endKey.value, gradient, interpolator.tempInstance);
            this._targetSetFunction(value);
            return;
        }

        const outTangent = startKey.outTangent ? startKey.outTangent : startKey.value;
        const inTangent = endKey.inTangent ? endKey.inTangent : endKey.value;
        const value = interpolator.hermite(startKey.value, endKey.value, outTangent, inTangent, gradient, interpolator.tempInstance);
        this._targetSetFunction(value);
    }
}

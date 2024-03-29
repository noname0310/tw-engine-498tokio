import { AnimationTrack } from "../container/AnimationTrack";
import { InterpolationKind } from "../key/AnimationKey";
import { IAnimationInstance } from "./IAniamtionInstance";

export class AnimationTrackInstance<T> implements IAnimationInstance {
    private _targetSetFunction: (value: T) => void;

    private _currentFrameIndex: number;
    private readonly _animationTrack: AnimationTrack<T>;

    public constructor(animationTrack: AnimationTrack<T>, targetSetFunction: (value: T) => void) {
        this._animationTrack = animationTrack;
        this._targetSetFunction = targetSetFunction;
        this._currentFrameIndex = 0;
    }

    public get animationContainer(): AnimationTrack<T> {
        return this._animationTrack;
    }

    public get targetSetFunction(): (value: T) => void {
        return this._targetSetFunction;
    }

    public set targetSetFunction(targetSetFunction: (value: T) => void) {
        this._targetSetFunction = targetSetFunction;
    }

    public frameIndexHint(frameIndex: number): void {
        this._currentFrameIndex = frameIndex < 0 ? 0 : frameIndex;
    }

    public process(frameTime: number): void {
        const keys = this._animationTrack.keys;

        if (keys.length === 0) return;
        if (keys.length === 1) {
            this._targetSetFunction(keys[0].value);
            return;
        }

        let startKeyIndex = this._currentFrameIndex;

        if (frameTime < 0) frameTime = 0;

        if (2048 < keys.length && 540 < Math.abs(frameTime - keys[startKeyIndex].frame)) {
            // use binary search for large key count
            let min = 0;
            let max = keys.length - 1;
            while (min < max) {
                const mid = min + ((max - min) >> 1);
                if (frameTime < keys[mid + 1].frame) {
                    max = mid;
                } else {
                    min = mid + 1;
                }
            }
            startKeyIndex = min;
        } else {
            while (0 < startKeyIndex && frameTime < keys[startKeyIndex].frame) startKeyIndex -= 1;
            while (startKeyIndex < keys.length - 1 && frameTime >= keys[startKeyIndex + 1].frame) startKeyIndex += 1;
        }

        // start of frame processing
        if (frameTime < keys[startKeyIndex].frame) {
            this._targetSetFunction(keys[startKeyIndex].value);
            return;
        }

        this._currentFrameIndex = startKeyIndex;

        const startKey = keys[startKeyIndex];
        const endKey = keys[startKeyIndex + 1];

        // if (startKey === undefined) {
        //     this._targetSetFunction(endKey.value);
        //     return;
        // }

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

        if (startKey.interpolation === InterpolationKind.Linear && (endKey.interpolation === InterpolationKind.Linear || endKey.interpolation === InterpolationKind.Step)) {
            const value = interpolator.lerp(startKey.value, endKey.value, gradient, interpolator.tempInstance);
            this._targetSetFunction(value);
            return;
        }

        //cubic interpolation
        let outTangent: T;
        let inTangent: T;
        if (startKey.outTangent === undefined) {
            const linearTangent = interpolator.linearTangent;
            outTangent = linearTangent;
            if (endKey.inTangent === undefined) {
                inTangent = linearTangent;
            } else {
                inTangent = endKey.inTangent!;
            }
        } else {
            outTangent = startKey.outTangent!;
            if (endKey.inTangent === undefined) {
                inTangent = interpolator.linearTangent;
            } else {
                inTangent = endKey.inTangent!;
            }
        }
        const value = interpolator.cubic(startKey.value, endKey.value, outTangent, inTangent, gradient, interpolator.tempInstance);
        this._targetSetFunction(value);
    }
}

import { Vector2, Vector3, Quaternion } from "three/src/Three";
import { IAnimationInterpolator, QuaternionInterpolator, ScalarInterpolator, Vector2Interpolator, Vector3Interpolator } from "./AnimationInterpolator";
import { AnimationKey } from "./AnimationKey";
import { AnimationTrackInstance } from "./AnimationTrackInstance";

export class AnimationTrack<T> {
    /**
     * this member must be sorted by frame member
     */
    private readonly _keys: AnimationKey<T>[];
    private readonly _interpolator: IAnimationInterpolator<T>;

    public constructor(keys: AnimationKey<T>[], interpolator: IAnimationInterpolator<T>) {
        this._keys = keys.slice();
        this._interpolator = interpolator;
    }

    public get keys(): readonly AnimationKey<T>[] {
        return this._keys;
    }

    public get interpolator(): IAnimationInterpolator<T> {
        return this._interpolator;
    }

    public createInstance(target: (value: T) => void): AnimationTrackInstance<T> {
        return new AnimationTrackInstance<T>(this, target);
    }

    public static createScalarTrack(keys: AnimationKey<number>[]): AnimationTrack<number> {
        return new AnimationTrack(keys, ScalarInterpolator);
    }

    public static createVector2Track(keys: AnimationKey<Vector2>[]): AnimationTrack<Vector2> {
        return new AnimationTrack(keys, Vector2Interpolator);
    }

    public static createVector3Track(keys: AnimationKey<Vector3>[]): AnimationTrack<Vector3> {
        return new AnimationTrack(keys, Vector3Interpolator);
    }

    public static createQuaternionTrack(keys: AnimationKey<Quaternion>[]): AnimationTrack<Quaternion> {
        return new AnimationTrack(keys, QuaternionInterpolator);
    }
}

import { Vector2, Vector3, Quaternion } from "three/src/Three";
import { IAnimationInterpolator, QuaternionInterpolator, ScalarInterpolator, Vector2Interpolator, Vector3Interpolator } from "./AnimationInterpolator";
import { AnimationKey } from "./AnimationKey";
import { AnimationTrackInstance } from "./AnimationTrackInstance";
import { IAnimationContainer } from "./IAnimationContainer";

export class AnimationTrack<T> implements IAnimationContainer {
    /**
     * this member must be sorted by frame member
     */
    private readonly _keys: AnimationKey<T>[];
    private readonly _interpolator: IAnimationInterpolator<T>;

    public constructor(keys: AnimationKey<T>[], interpolator: IAnimationInterpolator<T>) {
        AnimationTrack.validateKeys(keys);
        this._keys = keys.slice();
        this._interpolator = interpolator;
    }

    private static validateKeys<T>(keys: AnimationKey<T>[]): void {
        let previousFrame = 0;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].frame < previousFrame) {
                throw new Error("AnimationTrack: keys must be sorted by frame");
            }
            previousFrame = keys[i].frame;
        }
    }

    public get keys(): readonly AnimationKey<T>[] {
        return this._keys;
    }

    public get interpolator(): IAnimationInterpolator<T> {
        return this._interpolator;
    }

    public get startFrame(): number {
        return this._keys[0].frame;
    }

    public get endFrame(): number {
        return this._keys[this._keys.length - 1].frame;
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

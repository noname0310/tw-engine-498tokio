import { Vector2, Vector3, Quaternion } from "three/src/Three";
import { IAnimationInterpolator, QuaternionHermiteInterpolator, ScalarHermiteInterpolator, Vector2HermiteInterpolator, Vector3HermiteInterpolator } from "../AnimationInterpolator";
import { AnimationKey } from "../key/AnimationKey";
import { AnimationTrackInstance } from "../instance/AnimationTrackInstance";
import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationTrack } from "./IAnimationTrack";
import { IAnimationInstance } from "../instance/IAniamtionInstance";
import { BindOk } from "../bind/BindOk";

type GetTangentType<T> = T extends IAnimationInterpolator<infer _, infer U> ? U : never;

export class AnimationTrack<T> implements IAnimationContainer<(value: T) => void>, IAnimationTrack {
    /**
     * this member must be sorted by frame member
     */
    private readonly _keys: AnimationKey<T, any>[];
    private readonly _interpolator: IAnimationInterpolator<T, any>;

    private constructor(keys: AnimationKey<T, any>[], interpolator: IAnimationInterpolator<T, any>, frameRate = 60) {
        AnimationTrack.validateKeys(keys);
        this._keys = keys.slice();
        this._interpolator = interpolator;

        if (frameRate <= 0) {
            throw new Error("AnimationTrack: frameRate must be positive");
        }
        this.frameRate = frameRate;
    }

    private static validateKeys<T>(keys: AnimationKey<T, any>[]): void {
        let previousFrame = 0;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].frame < previousFrame) {
                throw new Error("AnimationTrack: keys must be sorted by frame");
            }
            if (keys[i].frame < 0) {
                throw new Error("AnimationTrack: keys must be positive");
            }
            previousFrame = keys[i].frame;
        }
    }

    public get keys(): readonly AnimationKey<T, any>[] {
        return this._keys;
    }

    public get interpolator(): IAnimationInterpolator<T, any> {
        return this._interpolator;
    }

    public get startFrame(): number {
        if (this._keys.length === 0) return 0;
        return this._keys[0].frame;
    }

    public get endFrame(): number {
        if (this._keys.length === 0) return 0;
        return this._keys[this._keys.length - 1].frame;
    }

    public readonly frameRate: number;

    public createInstance(target: (value: T) => void): AnimationTrackInstance<T> {
        return new AnimationTrackInstance<T>(this, target);
    }

    public tryCreateInstance(target: (value: T) => void): [IAnimationInstance, typeof BindOk] {
        return [new AnimationTrackInstance<T>(this, target), BindOk];
    }

    public static createTrack<T, U>(keys: AnimationKey<T, U>[], interpolator: IAnimationInterpolator<T, U>, frameRate?: number): AnimationTrack<T> {
        return new AnimationTrack<T>(keys, interpolator, frameRate);
    }

    public static createScalarTrack(keys: AnimationKey<number, GetTangentType<typeof ScalarHermiteInterpolator>>[], frameRate?: number): AnimationTrack<number> {
        return new AnimationTrack(keys, ScalarHermiteInterpolator, frameRate);
    }

    public static createVector2Track(keys: AnimationKey<Vector2, GetTangentType<typeof Vector2HermiteInterpolator>>[], frameRate?: number): AnimationTrack<Vector2> {
        return new AnimationTrack(keys, Vector2HermiteInterpolator, frameRate);
    }

    public static createVector3Track(keys: AnimationKey<Vector3, GetTangentType<typeof Vector3HermiteInterpolator>>[], frameRate?: number): AnimationTrack<Vector3> {
        return new AnimationTrack(keys, Vector3HermiteInterpolator, frameRate);
    }

    public static createQuaternionTrack(keys: AnimationKey<Quaternion, GetTangentType<typeof QuaternionHermiteInterpolator>>[], frameRate?: number): AnimationTrack<Quaternion> {
        return new AnimationTrack(keys, QuaternionHermiteInterpolator, frameRate);
    }
}

import { IAnimationKey } from "./IAnimationKey";

export enum InterpolationKind {
    Cubic,
    Linear,
    Step
}

export class AnimationKey<T> implements IAnimationKey {
    public readonly value: T;
    public readonly frame: number;
    public readonly inTangent?: T;
    public readonly outTangent?: T;
    public readonly interpolation: InterpolationKind;

    private constructor(frame: number, value: T, interpolation: InterpolationKind, inTangent?: T, outTangent?: T) {
        this.value = value;
        this.frame = frame;
        this.interpolation = interpolation;
        this.inTangent = inTangent;
        this.outTangent = outTangent;
    }

    public static createRefType<T extends { clone(): T }>(frame: number, value: T, interpolation: InterpolationKind.Linear|InterpolationKind.Step): AnimationKey<T>;

    public static createRefType<T extends { clone(): T }>(frame: number, value: T, interpolation: InterpolationKind.Cubic, inTangent: T, outTangent: T): AnimationKey<T>;

    public static createRefType<T extends { clone(): T }>(frame: number, value: T, interpolation: InterpolationKind, inTangent?: T, outTangent?: T): AnimationKey<T> {
        return new AnimationKey<T>(frame, value.clone(), interpolation, inTangent?.clone(), outTangent?.clone());
    }

    public static createValueType<T>(frame: number, value: T, interpolation: InterpolationKind.Linear|InterpolationKind.Step): AnimationKey<T>;

    public static createValueType<T>(frame: number, value: T, interpolation: InterpolationKind.Cubic, inTangent: T, outTangent: T): AnimationKey<T>;

    public static createValueType<T>(frame: number, value: T, interpolation: InterpolationKind, inTangent?: T, outTangent?: T): AnimationKey<T> {
        return new AnimationKey<T>(frame, value, interpolation, inTangent, outTangent);
    }
}

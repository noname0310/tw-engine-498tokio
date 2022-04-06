export const enum InterpolationKind {
    Cubic,
    Linear,
    Step
}

export class AnimationKey<T> {
    public readonly value: T;
    public readonly frame: number;
    public readonly inTangent?: T;
    public readonly outTangent?: T;
    public readonly interpolation: InterpolationKind;

    public constructor(value: T, frame: number, interpolation: InterpolationKind);

    public constructor(value: T, frame: number, interpolation: InterpolationKind, inTangent: T, outTangent: T);

    public constructor(value: T, frame: number, interpolation: InterpolationKind, inTangent?: T, outTangent?: T) {
        this.value = value;
        this.frame = frame;
        this.interpolation = interpolation;
        this.inTangent = inTangent;
        this.outTangent = outTangent;
    }
}

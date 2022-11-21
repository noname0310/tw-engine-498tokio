import { IAnimationKey } from "./IAnimationKey";

export enum InterpolationKind {
    Cubic,
    Linear,
    Step
}

export type Cloneable = {
    clone(): any;
}

export class AnimationKey<T, U = any> implements IAnimationKey {
    public readonly value: T;
    public readonly frame: number;
    public readonly inTangent?: U;
    public readonly outTangent?: U;
    public readonly interpolation: InterpolationKind;

    /**
     * create a key with a value and a frame
     *
     * if type of "value" implements "clone" method, then they will be cloned
     * if type of "inTangent", "outTangent" implements "clone" method, then they will be cloned
     * @param frame
     * @param value
     * @param interpolation
     * @param inTangent
     * @param outTangent
     */
    public constructor(frame: number, value: T, interpolation: InterpolationKind, inTangent?: U, outTangent?: U) {
        this.value = (value as unknown as Cloneable).clone ? (value as unknown as Cloneable).clone() as T : value;
        this.frame = frame;
        this.interpolation = interpolation;
        if (inTangent) {
            this.inTangent = (inTangent as unknown as Cloneable).clone ? (inTangent as unknown as Cloneable).clone() as U : inTangent;
        }
        if (outTangent) {
            this.outTangent = (outTangent as unknown as Cloneable).clone ? (outTangent as unknown as Cloneable).clone() as U : outTangent;
        }
    }
}

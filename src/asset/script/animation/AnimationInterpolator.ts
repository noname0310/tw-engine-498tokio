import { Vector2, Vector3, Quaternion, MathUtils } from "three/src/Three";

export interface IAnimationInterpolator<T, U> {
    readonly tempInstance?: T; //if T is value type, this is undefined
    readonly linearTangent: U;
    lerp: (start: T, end: T, gradient: number, out?: T) => T;
    cubic: (start: T, end: T, inTangent: U, outTangent: U, gradient: number, out?: T) => T;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ScalarHermiteInterpolator = new class implements IAnimationInterpolator<number, number> {
    public readonly linearTangent = 45 * MathUtils.DEG2RAD;

    public lerp(start: number, end: number, gradient: number): number {
        return start + (end - start) * gradient;
    }

    public cubic(start: number, end: number, inTangent: number, outTangent: number, gradient: number): number {
        const squaredGradient = gradient * gradient;
        const cubedGradient = squaredGradient * gradient;

        const part1 = 2.0 * cubedGradient - 3.0 * squaredGradient + 1.0;
        const part2 = -2.0 * cubedGradient + 3.0 * squaredGradient;
        const part3 = cubedGradient - 2.0 * squaredGradient + gradient;
        const part4 = cubedGradient - squaredGradient;

        const hermiteGradient = 0 * part1 + 1 * part2 + inTangent * part3 + outTangent * part4;
        return start + (end - start) * hermiteGradient;
    }
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Vector2HermiteInterpolator = new class implements IAnimationInterpolator<Vector2, Vector2> {
    public readonly tempInstance = new Vector2();
    public readonly linearTangent = new Vector2(45 * MathUtils.DEG2RAD, 45 * MathUtils.DEG2RAD);

    public lerp(start: Vector2, end: Vector2, gradient: number, out?: Vector2): Vector2 {
        if (!out) out = new Vector2();

        out.x = start.x + (end.x - start.x) * gradient;
        out.y = start.y + (end.y - start.y) * gradient;

        return out;
    }

    public cubic(
        start: Vector2,
        end: Vector2,
        inTangent: Vector2,
        outTangent: Vector2,
        gradient: number,
        out?: Vector2
    ): Vector2 {
        if (!out) out = new Vector2();

        const squaredGradient = gradient * gradient;
        const cubedGradient = squaredGradient * gradient;

        const part1 = 2.0 * cubedGradient - 3.0 * squaredGradient + 1.0;
        const part2 = -2.0 * cubedGradient + 3.0 * squaredGradient;
        const part3 = cubedGradient - 2.0 * squaredGradient + gradient;
        const part4 = cubedGradient - squaredGradient;

        out.x = 0 * part1 + 1 * part2 + inTangent.x * part3 + outTangent.x * part4;
        out.y = 0 * part1 + 1 * part2 + inTangent.y * part3 + outTangent.y * part4;

        out.x = start.x + (end.x - start.x) * out.x;
        out.y = start.y + (end.y - start.y) * out.y;

        return out;
    }
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Vector3HermiteInterpolator = new class implements IAnimationInterpolator<Vector3, Vector3> {
    public readonly tempInstance = new Vector3();
    public readonly linearTangent = new Vector3(45 * MathUtils.DEG2RAD, 45 * MathUtils.DEG2RAD, 45 * MathUtils.DEG2RAD);

    public lerp(start: Vector3, end: Vector3, gradient: number, out?: Vector3): Vector3 {
        if (!out) out = new Vector3();

        out.x = start.x + (end.x - start.x) * gradient;
        out.y = start.y + (end.y - start.y) * gradient;
        out.z = start.z + (end.z - start.z) * gradient;

        return out;
    }

    public cubic(
        start: Vector3,
        end: Vector3,
        inTangent: Vector3,
        outTangent: Vector3,
        gradient: number,
        out?: Vector3
    ): Vector3 {
        if (!out) out = new Vector3();

        const squaredGradient = gradient * gradient;
        const cubedGradient = squaredGradient * gradient;

        const part1 = 2.0 * cubedGradient - 3.0 * squaredGradient + 1.0;
        const part2 = -2.0 * cubedGradient + 3.0 * squaredGradient;
        const part3 = cubedGradient - 2.0 * squaredGradient + gradient;
        const part4 = cubedGradient - squaredGradient;

        out.x = 0 * part1 + 1 * part2 + inTangent.x * part3 + outTangent.x * part4;
        out.y = 0 * part1 + 1 * part2 + inTangent.y * part3 + outTangent.y * part4;
        out.z = 0 * part1 + 1 * part2 + inTangent.z * part3 + outTangent.z * part4;

        out.x = start.x + (end.x - start.x) * out.x;
        out.y = start.y + (end.y - start.y) * out.y;
        out.z = start.z + (end.z - start.z) * out.z;

        return out;
    }
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QuaternionHermiteInterpolator = new class implements IAnimationInterpolator<Quaternion, number> {
    public readonly tempInstance = new Quaternion();
    public readonly linearTangent = 45 * MathUtils.DEG2RAD;

    //slerp interpolation
    public lerp(start: Quaternion, end: Quaternion, gradient: number, out?: Quaternion): Quaternion {
        let cosOmega = start.x * end.x + start.y * end.y + start.z * end.z + start.w * end.w;
        let flip = false;

        if (cosOmega < 0.0) {
            flip = true;
            cosOmega = -cosOmega;
        }

        let s1, s2;

        if (cosOmega > 0.999999) {
            s1 = 1.0 - gradient;
            s2 = flip ? -gradient : gradient;
        } else {
            const omega = Math.acos(cosOmega);
            const invSinOmega = 1.0 / Math.sin(omega);

            s1 = Math.sin((1.0 - gradient) * omega) * invSinOmega;
            s2 = flip 
                ? -Math.sin(gradient * omega) * invSinOmega
                : Math.sin(gradient * omega) * invSinOmega;
        }

        if (!out) out = new Quaternion();

        out.x = s1 * start.x + s2 * end.x;
        out.y = s1 * start.y + s2 * end.y;
        out.z = s1 * start.z + s2 * end.z;
        out.w = s1 * start.w + s2 * end.w;

        return out;
    }

    public cubic(
        start: Quaternion,
        end: Quaternion,
        inTangent: number,
        outTangent: number,
        gradient: number,
        out?: Quaternion
    ): Quaternion {
        if (!out) out = new Quaternion();

        const squaredGradient = gradient * gradient;
        const cubedGradient = squaredGradient * gradient;

        const part1 = 2.0 * cubedGradient - 3.0 * squaredGradient + 1.0;
        const part2 = -2.0 * cubedGradient + 3.0 * squaredGradient;
        const part3 = cubedGradient - 2.0 * squaredGradient + gradient;
        const part4 = cubedGradient - squaredGradient;

        const hermiteGradient = 0 * part1 + 1 * part2 + inTangent * part3 + outTangent * part4;
        return this.lerp(start, end, hermiteGradient, out);
    }
};

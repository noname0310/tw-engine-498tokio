import { Vector2, Vector3, Quaternion } from "three/src/Three";

export interface IAnimationInterpolator<T> {
    readonly tangentTempInstance?: T; //if T is value type, this is undefined
    readonly tempInstance?: T; //if T is value type, this is undefined
    lerp: (start: T, end: T, gradient: number, out?: T) => T;
    hermite: (start: T, end: T, inTangent: T, outTangent: T, gradient: number, out?: T) => T;
    linearTangent: (start: T, end: T, out?: T) => T;
}

export const ScalarInterpolator = new class implements IAnimationInterpolator<number> {
    public lerp(start: number, end: number, gradient: number): number {
        return start + (end - start) * gradient;
    }

    public hermite(start: number, end: number, inTangent: number, outTangent: number, gradient: number): number {
        const squaredGradient = gradient * gradient;
        const cubedGradient = squaredGradient * gradient;

        const part1 = 2.0 * cubedGradient - 3.0 * squaredGradient + 1.0;
        const part2 = -2.0 * cubedGradient + 3.0 * squaredGradient;
        const part3 = cubedGradient - 2.0 * squaredGradient + gradient;
        const part4 = cubedGradient - squaredGradient;

        return start * part1 + end * part2 + inTangent * part3 + outTangent * part4;
    }

    public linearTangent(start: number, end: number): number {
        return end - start;
    }
};

export const Vector2Interpolator = new class implements IAnimationInterpolator<Vector2> {
    public readonly tangentTempInstance = new Vector2();
    public readonly tempInstance = new Vector2();

    public lerp(start: Vector2, end: Vector2, gradient: number, out?: Vector2): Vector2 {
        if (!out) out = new Vector2();

        out.x = start.x + (end.x - start.x) * gradient;
        out.y = start.y + (end.y - start.y) * gradient;

        return out;
    }

    public hermite(
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

        out.x = start.x * part1 + end.x * part2 + inTangent.x * part3 + outTangent.x * part4;
        out.y = start.y * part1 + end.y * part2 + inTangent.y * part3 + outTangent.y * part4;

        return out;
    }

    public linearTangent(start: Vector2, end: Vector2, out?: Vector2): Vector2 {
        if (!out) out = new Vector2();

        out.x = end.x - start.x;
        out.y = end.y - start.y;
        
        return out;
    }
};

export const Vector3Interpolator = new class Vector3Interpolator implements IAnimationInterpolator<Vector3> {
    public readonly tangentTempInstance = new Vector3();
    public readonly tempInstance = new Vector3();

    public lerp(start: Vector3, end: Vector3, gradient: number, out?: Vector3): Vector3 {
        if (!out) out = new Vector3();

        out.x = start.x + (end.x - start.x) * gradient;
        out.y = start.y + (end.y - start.y) * gradient;
        out.z = start.z + (end.z - start.z) * gradient;

        return out;
    }

    public hermite(
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

        out.x = start.x * part1 + end.x * part2 + inTangent.x * part3 + outTangent.x * part4;
        out.y = start.y * part1 + end.y * part2 + inTangent.y * part3 + outTangent.y * part4;
        out.z = start.z * part1 + end.z * part2 + inTangent.z * part3 + outTangent.z * part4;

        return out;
    }

    public linearTangent(start: Vector3, end: Vector3, out?: Vector3): Vector3 {
        if (!out) out = new Vector3();

        out.x = end.x - start.x;
        out.y = end.y - start.y;
        out.z = end.z - start.z;

        return out;
    }
};

export const QuaternionInterpolator = new class QuaternionInterpolator implements IAnimationInterpolator<Quaternion> {
    public readonly tangentTempInstance = new Quaternion();
    public readonly tempInstance = new Quaternion();

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

    public hermite(
        start: Quaternion,
        end: Quaternion,
        inTangent: Quaternion,
        outTangent: Quaternion,
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

        out.w = start.w * part1 + end.w * part2 + inTangent.w * part3 + outTangent.w * part4;
        out.x = start.x * part1 + end.x * part2 + inTangent.x * part3 + outTangent.x * part4;
        out.y = start.y * part1 + end.y * part2 + inTangent.y * part3 + outTangent.y * part4;
        out.z = start.z * part1 + end.z * part2 + inTangent.z * part3 + outTangent.z * part4;

        return out;
    }

    public linearTangent(start: Quaternion, end: Quaternion, out?: Quaternion): Quaternion {
        if (!out) out = new Quaternion();

        out.x = end.x - start.x;
        out.y = end.y - start.y;
        out.z = end.z - start.z;
        out.w = end.w - start.w;

        return out;
    }
};

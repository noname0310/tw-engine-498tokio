import { Vector2 } from "three/src/Three";

export interface IAnimationInterpolator<T> {
    lerp: (start: T, end: T, gradient: number) => T;
    hermite: (start: T, end: T, inTangent: T, outTangent: T, gradient: number) => T;
}

export class ScalarInterpolator implements IAnimationInterpolator<number> {
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
}

export class Vector2Interpolator implements IAnimationInterpolator<Vector2> {
    public lerp(start: Vector2, end: Vector2, gradient: number, out?: Vector2): Vector2 {
        if (!out) out = new Vector2();

        out.x = start.x + (end.x - start.x) * gradient;
        out.y = start.y + (end.y - start.y) * gradient;

        return out;
    }

    public hermite(start: Vector2, end: Vector2, inTangent: Vector2, outTangent: Vector2, gradient: number): Vector2 {
        
    }
}

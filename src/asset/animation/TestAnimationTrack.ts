import { Vector3, Vector2 } from "three/src/Three";
import { AnimationKey, InterpolationKind } from "../script/animation/AnimationKey";
import { AnimationTrack } from "../script/animation/AnimationTrack";

export const testAnimationTrack1 = (() => {
    const zero = new Vector3(0, 0, 0);
    let acc = 0;
    return AnimationTrack.createVector3Track([
        AnimationKey.createRefType(acc += 0.0, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Step)
    ]);
})();

export const testAnimationTrack2 = (() => {
    const zero = new Vector2(0, 0);
    let acc = 0;
    return AnimationTrack.createVector2Track([
        AnimationKey.createRefType(acc += 0.0, new Vector2( 0,  0), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2( 2,  2), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2(-2, -2), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2(-2,  2), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2( 2, -2), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2( 1,  1), InterpolationKind.Cubic, zero, zero),
        AnimationKey.createRefType(acc += 100, new Vector2( 0,  0), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2( 2,  2), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2(-2, -2), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2(-2,  2), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2( 2, -2), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2( 1,  1), InterpolationKind.Linear),
        AnimationKey.createRefType(acc += 100, new Vector2( 0,  0), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector2( 2,  2), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector2(-2, -2), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector2(-2,  2), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector2( 2, -2), InterpolationKind.Step),
        AnimationKey.createRefType(acc += 100, new Vector2( 1,  1), InterpolationKind.Step)
    ]);
})();

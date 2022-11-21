import { Vector2, Vector3 } from "three/src/Three";

import { AnimationTrack } from "../../script/animation/container/AnimationTrack";
import { AnimationKey, InterpolationKind } from "../../script/animation/key/AnimationKey";

export const testAnimationTrack1 = ((): AnimationTrack<Vector3> => {
    const zero = new Vector3(0, 0, 0);
    let acc = 0;
    return AnimationTrack.createVector3Track([
        new AnimationKey(acc += 0.0, new Vector3(0,  0,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(2,  2,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(2, -2,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(1,  1,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector3(0,  0,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(2,  2,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(2, -2,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(1,  1,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector3(0,  0,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector3(2,  2,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector3(2, -2,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector3(1,  1,  0), InterpolationKind.Step)
    ]);
})();

export const testAnimationTrack2 = ((): AnimationTrack<Vector2> => {
    const zero = new Vector2(0, 0);
    let acc = 0;
    return AnimationTrack.createVector2Track([
        new AnimationKey(acc += 0.0, new Vector2(0,  0), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(2,  2), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(-2, -2), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(-2,  2), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(2, -2), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(1,  1), InterpolationKind.Cubic, zero, zero),
        new AnimationKey(acc += 100, new Vector2(0,  0), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(2,  2), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(-2, -2), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(-2,  2), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(2, -2), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(1,  1), InterpolationKind.Linear),
        new AnimationKey(acc += 100, new Vector2(0,  0), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector2(2,  2), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector2(-2, -2), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector2(-2,  2), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector2(2, -2), InterpolationKind.Step),
        new AnimationKey(acc += 100, new Vector2(1,  1), InterpolationKind.Step)
    ]);
})();

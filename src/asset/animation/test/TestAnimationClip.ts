import { Vector3, Quaternion } from "three/src/Three";
import { AnimationClip } from "../../script/animation/container/AnimationClip";
import { AnimationKey, InterpolationKind } from "../../script/animation/key/AnimationKey";
import { AnimationTrack } from "../../script/animation/container/AnimationTrack";

export const testAnimationClip1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroScalar = 0;
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    return new AnimationClip([
        {
            name: "position" as const, 
            track: AnimationTrack.createVector3Track([
                new AnimationKey(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Step)
            ])
        },
        {
            name: "rotation" as const,
            track: AnimationTrack.createQuaternionTrack([
                new AnimationKey(acc = 0.00, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step)
            ])
        },
    ]);
})();

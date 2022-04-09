import { Vector3, Quaternion } from "three/src/Three";
import { AnimationClip } from "../script/animation/AnimationClip";
import { AnimationKey, InterpolationKind } from "../script/animation/AnimationKey";
import { AnimationTrack } from "../script/animation/AnimationTrack";

export const testAnimationClip1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroQuaternion = new Quaternion(0, 0, 0, 0);
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    return new AnimationClip([
        {
            name: "position" as const, 
            track: AnimationTrack.createVector3Track([
                AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
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
            ])
        },
        {
            name: "rotation" as const,
            track: AnimationTrack.createQuaternionTrack([
                AnimationKey.createRefType(acc = 0.00, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, 0.00000), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.PI), InterpolationKind.Step)
            ])
        },
    ]);
})();

import { Vector3, Quaternion } from "three/src/Three";
import { AnimationClip } from "../script/animation/AnimationClip";
import { AnimationKey, InterpolationKind } from "../script/animation/AnimationKey";
import { AnimationSequence, RangedAnimation } from "../script/animation/AnimationSequence";
import { AnimationTrack } from "../script/animation/AnimationTrack";
//import { BindInfo } from "../script/animation/BindInfo";

export const testAnimationSequnace1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroQuaternion = new Quaternion(0, 0, 0, 0);
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-3,  2,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 3,  2,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 1, -1,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-3, -2,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Step)
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
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
            ])
        ),
    ]);
})();

export const testAnimationSequnace2 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroQuaternion = new Quaternion(0, 0, 0, 0);
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            testAnimationSequnace1
        ),
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-3,  2,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 3,  2,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3( 1, -1,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(-3, -2,  0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Step)
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
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
            ])
        ),
    ]);
})();

export const testRandomSequence1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroQuaternion = new Quaternion(0, 0, 0, 0);
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                AnimationKey.createRefType(acc = 0.00, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step)
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
                {
                    name: "position" as const, 
                    track: AnimationTrack.createVector3Track([
                        AnimationKey.createRefType(acc = 0.00, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step)
                    ])
                },
                {
                    name: "rotation" as const,
                    track: AnimationTrack.createQuaternionTrack([
                        AnimationKey.createRefType(acc = 0.00, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroQuaternion, zeroQuaternion),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step)
                    ])
                },
            ])
        ),
    ]);
})();

// function bindTypeTest1(): void {
//     testAnimationSequnace1.createInstance([
//         new BindInfo([
//             { trackName: "position", target: (value: Vector3) => { console.log(value); } },
//             { trackName: "rotation", target: (value: Vector3) => { console.log(value); } },
//         ]),
//         (value: Vector3) => {
//             console.log(value);
//         },
//     ]);
//     let acc = 0;
//     new RangedAnimation(
//         new AnimationClip([
//             {
//                 name: "position" as const, 
//                 track: AnimationTrack.createVector3Track([
//                     AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Step),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Step),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Step),
//                     AnimationKey.createRefType(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Step),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Step),
//                     AnimationKey.createRefType(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Step)
//                 ])
//             },
//         ])
//     );
// }

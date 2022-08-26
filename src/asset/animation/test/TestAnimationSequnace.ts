import { Vector3, Quaternion } from "three/src/Three";
import { AnimationClip } from "../../script/animation/container/AnimationClip";
import { AnimationEventKey } from "../../script/animation/key/AnimationEventKey";
import { AnimationEventTrack } from "../../script/animation/container/AnimationEventTrack";
import { AnimationKey, InterpolationKind } from "../../script/animation/key/AnimationKey";
import { AnimationSequence, RangedAnimation } from "../../script/animation/container/AnimationSequence";
import { AnimationTrack } from "../../script/animation/container/AnimationTrack";

export const testAnimationSequence1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroScalar = 0;
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                new AnimationKey(acc = 0.00, new Vector3( 0,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-3,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 3,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 1, -1,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-3, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Step)
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
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
            ])
        )
    ]);
})();

export const testAnimationSequence2 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroScalar = 0;
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            testAnimationSequence1
        ),
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                new AnimationKey(acc = 0.00, new Vector3( 0,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-3,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 3,  2,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3( 1, -1,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 3, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-2,  3,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-1,  1,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(-3, -2,  0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3( 2,  3,  0), InterpolationKind.Step)
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
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
            ])
        ),
    ]);
})();

export const testRandomSequence1 = (() => {
    const zeroVector3 = new Vector3(0, 0, 0);
    const zeroScalar = 0;
    const zAxis = new Vector3(0, 0, 1);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                new AnimationKey(acc = 0.00, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step)
            ]), 800
        ),
        new RangedAnimation(
            new AnimationClip([
                {
                    name: "position" as const, 
                    track: AnimationTrack.createVector3Track([
                        new AnimationKey(acc = 0.00, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Vector3(Math.random() * 4 - 2, Math.random() * 8 - 4, 0), InterpolationKind.Step)
                    ])
                },
                {
                    name: "rotation" as const,
                    track: AnimationTrack.createQuaternionTrack([
                        new AnimationKey(acc = 0.00, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Cubic, zeroScalar, zeroScalar),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Linear),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step),
                        new AnimationKey(acc += 100, new Quaternion().setFromAxisAngle(zAxis, Math.random() * 4 - 2), InterpolationKind.Step)
                    ])
                },
            ])
        ),
        new RangedAnimation(
            new AnimationEventTrack([
                new AnimationEventKey("event1", 0.00),
                new AnimationEventKey("event2", 100.00),
                new AnimationEventKey("event3", 200.00),
                new AnimationEventKey("event4", 300.00),
                new AnimationEventKey("event5", 400.00),
                new AnimationEventKey("event6", 500.00),
                new AnimationEventKey("event7", 600.00),
                new AnimationEventKey("event8", 700.00),
                new AnimationEventKey("event9", 800.00),
                new AnimationEventKey("event10", 900.00),
                new AnimationEventKey("event11", 1000.00),
                new AnimationEventKey("event12", 1100.00),
                new AnimationEventKey("event13", 1200.00),
                new AnimationEventKey("event14", 1300.00),
                new AnimationEventKey("event15", 1400.00),
                new AnimationEventKey("event16", 1500.00),
                new AnimationEventKey("event17", 1600.00),
                new AnimationEventKey("event18", 1700.00),
                new AnimationEventKey("event19", 1800.00),
                new AnimationEventKey("event20", 1900.00),
                new AnimationEventKey("event21", 2000.00)
            ])
        )
    ]);
})();

// function bindTypeTest1(): void {
//     testAnimationSequence1.createInstance([
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
//                     new AnimationKey(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Cubic, zeroVector3, zeroVector3),
//                     new AnimationKey(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Linear),
//                     new AnimationKey(acc += 100, new Vector3( 0,  0,  0), InterpolationKind.Step),
//                     new AnimationKey(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Step),
//                     new AnimationKey(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Step),
//                     new AnimationKey(acc += 100, new Vector3(-2,  2,  0), InterpolationKind.Step),
//                     new AnimationKey(acc += 100, new Vector3( 2, -2,  0), InterpolationKind.Step),
//                     new AnimationKey(acc += 100, new Vector3( 1,  1,  0), InterpolationKind.Step)
//                 ])
//             },
//         ])
//     );
// }

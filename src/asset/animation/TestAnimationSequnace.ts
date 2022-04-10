import { Vector3 } from "three/src/Three";
import { AnimationClip } from "../script/animation/AnimationClip";
import { AnimationKey, InterpolationKind } from "../script/animation/AnimationKey";
import { AnimationSequence, RangedAnimation } from "../script/animation/AnimationSequence";
import { AnimationTrack } from "../script/animation/AnimationTrack";
import { BindInfo } from "../script/animation/BindInfo";

export const testAnimationSequnace1 = (() => {
    const zero = new Vector3(0, 0, 0);
    let acc = 0;
    
    return new AnimationSequence([
        new RangedAnimation(
            AnimationTrack.createVector3Track([
                AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zero, zero),
                AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zero, zero),
                AnimationKey.createRefType(acc += 100, new Vector3( 4,  4,  0), InterpolationKind.Cubic, zero, zero),
            ])
        ),
        new RangedAnimation(
            new AnimationClip([
                {
                    name: "position" as const, 
                    track: AnimationTrack.createVector3Track([
                        AnimationKey.createRefType(acc = 0.00, new Vector3( 0,  0,  0), InterpolationKind.Cubic, zero, zero),
                        AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  0), InterpolationKind.Cubic, zero, zero),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  0), InterpolationKind.Cubic, zero, zero),
                    ])
                },
                {
                    name: "scale" as const,
                    track: AnimationTrack.createVector3Track([
                        AnimationKey.createRefType(acc = 0.00, new Vector3( 1,  1,  1), InterpolationKind.Cubic, zero, zero),
                        AnimationKey.createRefType(acc += 100, new Vector3( 2,  2,  1), InterpolationKind.Cubic, zero, zero),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2,  1), InterpolationKind.Cubic, zero, zero),
                    ])
                },
            ])
        ),
    ]);
})();

//@ts-ignore
function bindTypeTest1(): void {
    testAnimationSequnace1.createInstance([
        (value: Vector3) => {
            console.log(value);
        },
        new BindInfo([
            { trackName: "position", target: (value: Vector3) => { console.log(value); } },
            { trackName: "scale", target: (value: Vector3) => { console.log(value); } },
        ])
    ]);
}

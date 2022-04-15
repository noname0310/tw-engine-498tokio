import { AnimationKey, InterpolationKind } from "../script/animation/key/AnimationKey";
import { AnimationSequence, RangedAnimation } from "../script/animation/container/AnimationSequence";
import { AnimationTrack } from "../script/animation/container/AnimationTrack";
import { AnimationClip } from "../script/animation/container/AnimationClip";
import { AnimationEventTrack } from "../script/animation/container/AnimationEventTrack";
import { AnimationEventBindInfo, AnimationEventKey } from "../script/animation/key/AnimationEventKey";
import { AnimationClipBindInfo } from "../script/animation/AnimationClipBindInfo";

export class IntroAnimation {
    private static _timeScale = 1;

    private static _fireworkAnimationClip = new AnimationClip([
        {
            name: "firework1" as const, 
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 0., 0, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 2., 1, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 4., 2, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 6., 3, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 8., 4, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 10, 5, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 12, 6, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 14, 7, InterpolationKind.Step)
            ])
        },
        {
            name: "firework1_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("visible", this._timeScale * 0),
                new AnimationEventKey("invisible", this._timeScale * 16)
            ])
        },
        {
            name: "firework2" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 16, 0., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 19, 1., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 22, 2., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 25, 3., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 28, 4., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 31, 5., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 34, 6., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 37, 7., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 40, 8., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 43, 9., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 46, 10, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 49, 11, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 52, 12, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 55, 13, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 58, 14, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 61, 15, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 64, 16, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 67, 17, InterpolationKind.Step),
            ])
        },
        {
            name: "firework2_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 16),
                new AnimationEventKey("invisible", this._timeScale * 70)
            ])
        },
        {
            name: "firework3" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 31, 0., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 33, 1., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 35, 2., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 37, 3., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 39, 4., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 41, 5., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 43, 6., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 45, 7., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 47, 8., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 49, 9., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 51, 10, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 53, 11, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 55, 12, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 57, 13, InterpolationKind.Step),
            ])
        },
        {
            name: "firework3_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 31),
                new AnimationEventKey("invisible", this._timeScale * 60)
            ])
        },
        {
            name: "firework_sphere" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 45, 0., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 47, 1., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 49, 2., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 51, 3., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 53, 4., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 55, 5., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 57, 6., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 59, 7., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 61, 8., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 63, 9., InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 65, 10, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 67, 11, InterpolationKind.Step),
                AnimationKey.createValueType(this._timeScale * 69, 12, InterpolationKind.Step)
            ])
        },
        {
            name: "firework_sphere_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 45),
                new AnimationEventKey("invisible", this._timeScale * 71)
            ])
        }
    ]);

    public static sequance = new AnimationSequence([
        new RangedAnimation(this._fireworkAnimationClip),
        new RangedAnimation(this._fireworkAnimationClip, 115)
    ]);

    private static createActivationBindInfo(event: () => void, eventRestore: () => void) {
        return {
            visible: new AnimationEventBindInfo(event, eventRestore),
            invisible: new AnimationEventBindInfo(eventRestore, event)
        };
    }

    public static createBindInfo(
        firework1: (value: number) => void,
        fireWork1Enable: () => void,
        fireWork1Disable: () => void,
        firework2: (value: number) => void,
        fireWork2Enable: () => void,
        fireWork2Disable: () => void,
        firework3: (value: number) => void,
        fireWork3Enable: () => void,
        fireWork3Disable: () => void,
        fireworkSphere: (value: number) => void,
        fireworkSphereEnable: () => void,
        fireworkSphereDisable: () => void
    ) {
        const fireworkClipBindInfo = new AnimationClipBindInfo([
            { trackName: "firework1" as const, target: firework1 },
            {
                trackName: "firework1_activation" as const,
                target: IntroAnimation.createActivationBindInfo(fireWork1Enable, fireWork1Disable)
            },
            { trackName: "firework2" as const, target: firework2 },
            {
                trackName: "firework2_activation" as const,
                target: IntroAnimation.createActivationBindInfo(fireWork2Enable, fireWork2Disable)
            },
            { trackName: "firework3" as const, target: firework3 },
            {
                trackName: "firework3_activation" as const,
                target: IntroAnimation.createActivationBindInfo(fireWork3Enable, fireWork3Disable)
            },
            { trackName: "firework_sphere" as const, target: fireworkSphere },
            {
                trackName: "firework_sphere_activation" as const,
                target: IntroAnimation.createActivationBindInfo(fireworkSphereEnable, fireworkSphereDisable)
            }
        ]);

        return [fireworkClipBindInfo, fireworkClipBindInfo] as [typeof fireworkClipBindInfo, typeof fireworkClipBindInfo];
    }
}

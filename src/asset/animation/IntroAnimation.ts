import { AnimationKey, InterpolationKind } from "../script/animation/key/AnimationKey";
import { AnimationSequence, RangedAnimation } from "../script/animation/container/AnimationSequence";
import { AnimationTrack } from "../script/animation/container/AnimationTrack";
import { AnimationClip } from "../script/animation/container/AnimationClip";
import { AnimationEventTrack } from "../script/animation/container/AnimationEventTrack";
import { AnimationEventBindInfo, AnimationEventKey } from "../script/animation/key/AnimationEventKey";
import { AnimationClipBindInfo } from "../script/animation/AnimationClipBindInfo";

type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[P];
};

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
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
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
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
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
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
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
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 45),
                new AnimationEventKey("invisible", this._timeScale * 71)
            ])
        }
    ]);

    private static _blackScreenAnimationClip = new AnimationClip([
        {
            name: "black_screen_opacity" as const, 
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 75, 1, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 180, 0, InterpolationKind.Linear)
            ])
        },
        {
            name: "black_screen_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("visible", this._timeScale * 0),
                new AnimationEventKey("invisible", this._timeScale * 190)
            ])
        }
    ]);

    private static _moonAnimationClip = new AnimationClip([
        {
            name: "moon_hue" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 0, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 553 - 75, 360 * 4.8, InterpolationKind.Linear)
            ])
        }
    ]);

    private static _zoomOutAnimationClip = new AnimationClip([
        {
            name: "scale" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 0, 1, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 384 - 75, 0.6, InterpolationKind.Cubic, 0, 0)
            ])
        }
    ]);

    public static sequance = new AnimationSequence([
        new RangedAnimation(this._fireworkAnimationClip),
        new RangedAnimation(this._fireworkAnimationClip, 115),
        new RangedAnimation(this._fireworkAnimationClip, 222),
        new RangedAnimation(this._fireworkAnimationClip, 330),
        new RangedAnimation(this._blackScreenAnimationClip),
        new RangedAnimation(this._moonAnimationClip, 75),
        new RangedAnimation(this._zoomOutAnimationClip, 75),
    ]);

    private static createActivationBindInfo(event: () => void, eventRestore: () => void) {
        return {
            visible: new AnimationEventBindInfo(event, eventRestore),
            invisible: new AnimationEventBindInfo(eventRestore, event),
            invisible_norestore: new AnimationEventBindInfo(eventRestore)
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
        fireworkSphereDisable: () => void,
        blackScreen: (value: number) => void,
        blackScreenEnable: () => void,
        blackScreenDisable: () => void,
        moon: (value: number) => void,
        zoomOut: (value: number) => void,
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

        const blackScreenClipBindInfo = new AnimationClipBindInfo([
            { trackName: "black_screen_opacity" as const, target: blackScreen },
            {
                trackName: "black_screen_activation" as const,
                target: IntroAnimation.createActivationBindInfo(blackScreenEnable, blackScreenDisable)
            }
        ]);

        const moonClipBindInfo = new AnimationClipBindInfo([
            { trackName: "moon_hue" as const, target: moon }
        ]);

        const zoomOutClipBindInfo = new AnimationClipBindInfo([
            { trackName: "scale" as const, target: zoomOut }
        ]);

        const bindInfo = [
            fireworkClipBindInfo, fireworkClipBindInfo, fireworkClipBindInfo, fireworkClipBindInfo,
            blackScreenClipBindInfo,
            moonClipBindInfo,
            zoomOutClipBindInfo
        ] as const;
        return bindInfo as RemoveReadonly<typeof bindInfo>;
    }
}

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
    private static readonly _timeScale = 1;

    private static readonly _fireworkAnimationClip = new AnimationClip([
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
            ], 30)
        },
        {
            name: "firework1_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 0),
                new AnimationEventKey("invisible", this._timeScale * 16)
            ], 30)
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
                AnimationKey.createValueType(this._timeScale * 67, 17, InterpolationKind.Step)
            ], 30)
        },
        {
            name: "firework2_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 16),
                new AnimationEventKey("invisible", this._timeScale * 70)
            ], 30)
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
                AnimationKey.createValueType(this._timeScale * 57, 13, InterpolationKind.Step)
            ], 30)
        },
        {
            name: "firework3_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 31),
                new AnimationEventKey("invisible", this._timeScale * 60)
            ], 30)
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
            ], 30)
        },
        {
            name: "firework_sphere_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 45),
                new AnimationEventKey("invisible", this._timeScale * 71)
            ], 30)
        }
    ]);

    private static readonly _blackScreenAnimationClip = new AnimationClip([
        {
            name: "black_screen_opacity" as const, 
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 75, 1, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 180, 0, InterpolationKind.Linear)
            ], 30)
        },
        {
            name: "black_screen_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("visible", this._timeScale * 0),
                new AnimationEventKey("invisible", this._timeScale * 190)
            ], 30)
        }
    ]);

    private static readonly _moonAnimationClip = new AnimationClip([
        {
            name: "moon_hue" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 0, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 553 - 75, 360 * 4.8, InterpolationKind.Linear)
            ], 30)
        }
    ]);

    private static readonly _zoomOutAnimationClip = new AnimationClip([
        {
            name: "scale" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 0, 1, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 384 - 75, 0.6, InterpolationKind.Cubic, 0, 0)
            ], 30)
        }
    ]);

    private static readonly _grassAnimationClip = new AnimationClip([
        {
            name: "grass1_x" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 541 - 392, -40, InterpolationKind.Linear)
            ], 30)
        },
        {
            name: "grass1_y" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, -17, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 481 - 392, -11, InterpolationKind.Cubic, 0, 0)
            ], 30)
        }
    ]);

    private static readonly _grassAnimationClip2 = new AnimationClip([
        {
            name: "grass2_x" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 541 - 392, -30, InterpolationKind.Linear)
            ], 30)
        },
        {
            name: "grass2_y" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, -14, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 481 - 392, -7.2, InterpolationKind.Cubic, 0, 0)
            ], 30)
        }
    ]);

    private static readonly _grassAnimationClip3 = new AnimationClip([
        {
            name: "grass3_x" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 541 - 392, -20, InterpolationKind.Linear)
            ], 30)
        },
        {
            name: "grass3_y" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 392 - 392, -12, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 481 - 392, -4, InterpolationKind.Cubic, 0, 0)
            ], 30)
        }
    ]);

    private static readonly _spaceshipAnimationClip = new AnimationClip([
        {
            name: "position_y" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 372 - 372, -9, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 481 - 372, -0.5, InterpolationKind.Cubic, 0, 0),
                AnimationKey.createValueType(this._timeScale * 540 - 372, -0.5, InterpolationKind.Cubic, 0, 0),
                AnimationKey.createValueType(this._timeScale * 546 - 372, 0.1, InterpolationKind.Cubic, 0, 0),
                AnimationKey.createValueType(this._timeScale * 547 - 372, -9, InterpolationKind.Step)
            ], 30)
        },
        {
            name: "rotation_z" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 540 - 372, 0, InterpolationKind.Cubic, 0, 0),
                AnimationKey.createValueType(this._timeScale * 546 - 372, -Math.PI / 4 / 1.2, InterpolationKind.Cubic, 0, 0)
            ], 30)
        }
    ]);

    private static readonly _warpEffectAnimationClip = new AnimationClip([
        {
            name: "warp_effect_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible_norestore", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 547),
                new AnimationEventKey("invisible", this._timeScale * 558)
            ], 30)
        },
        {
            name: "warp_effect_anim" as const,
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 547, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 558, 12, InterpolationKind.Linear)
            ], 30)
        }
    ]);

    private static readonly _blackScreen2AnimationClip = new AnimationClip([
        {
            name: "black_screen2_opacity" as const, 
            track: AnimationTrack.createScalarTrack([
                AnimationKey.createValueType(this._timeScale * 547, 0, InterpolationKind.Linear),
                AnimationKey.createValueType(this._timeScale * 558, 1, InterpolationKind.Linear)
            ], 30)
        },
        {
            name: "black_screen2_activation" as const,
            track: new AnimationEventTrack([
                new AnimationEventKey("invisible", this._timeScale * 0),
                new AnimationEventKey("visible", this._timeScale * 547),
                new AnimationEventKey("visible", this._timeScale * 558)
            ], 30)
        }
    ]);

    public static readonly sequence = new AnimationSequence([
        new RangedAnimation(this._fireworkAnimationClip),
        new RangedAnimation(this._fireworkAnimationClip, this._timeScale * 115),
        new RangedAnimation(this._fireworkAnimationClip, this._timeScale * 222),
        new RangedAnimation(this._fireworkAnimationClip, this._timeScale * 330),

        new RangedAnimation(this._blackScreenAnimationClip),
        new RangedAnimation(this._moonAnimationClip, this._timeScale * 75),
        new RangedAnimation(this._zoomOutAnimationClip, this._timeScale * 75),

        new RangedAnimation(this._grassAnimationClip, this._timeScale * 392),
        new RangedAnimation(this._grassAnimationClip2, this._timeScale * 392),
        new RangedAnimation(this._grassAnimationClip3, this._timeScale * 392),

        new RangedAnimation(this._spaceshipAnimationClip, this._timeScale * 372),

        new RangedAnimation(this._warpEffectAnimationClip),
        new RangedAnimation(this._blackScreen2AnimationClip)
    ]);

    private static createActivationBindInfo(event: () => void, eventRestore: () => void): {
        visible: AnimationEventBindInfo;
        invisible: AnimationEventBindInfo;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        invisible_norestore: AnimationEventBindInfo;
    } {
        return {
            visible: new AnimationEventBindInfo(event, eventRestore),
            invisible: new AnimationEventBindInfo(eventRestore, event),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            invisible_norestore: new AnimationEventBindInfo(eventRestore)
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        grass1X: (value: number) => void,
        grass1Y: (value: number) => void,
        grass2X: (value: number) => void,
        grass2Y: (value: number) => void,
        grass3X: (value: number) => void,
        grass3Y: (value: number) => void,
        spaceshipY: (value: number) => void,
        spaceshipZ: (value: number) => void,
        warpEffectEnable: () => void,
        warpEffectDisable: () => void,
        warpEffectAnim: (value: number) => void,
        blackScreen2: (value: number) => void,
        blackScreen2Enable: () => void,
        blackScreen2Disable: () => void
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

        const grassClipBindInfo = new AnimationClipBindInfo([
            { trackName: "grass1_x" as const, target: grass1X },
            { trackName: "grass1_y" as const, target: grass1Y }
        ]);

        const grassClipBindInfo2 = new AnimationClipBindInfo([
            { trackName: "grass2_x" as const, target: grass2X },
            { trackName: "grass2_y" as const, target: grass2Y }
        ]);

        const grassClipBindInfo3 = new AnimationClipBindInfo([
            { trackName: "grass3_x" as const, target: grass3X },
            { trackName: "grass3_y" as const, target: grass3Y }
        ]);

        const spaceshipClipBindInfo = new AnimationClipBindInfo([
            { trackName: "position_y" as const, target: spaceshipY },
            { trackName: "rotation_z" as const, target: spaceshipZ }
        ]);

        const warpEffectClipBindInfo = new AnimationClipBindInfo([
            { 
                trackName: "warp_effect_activation" as const,
                target: IntroAnimation.createActivationBindInfo(warpEffectEnable, warpEffectDisable)
            },
            { trackName: "warp_effect_anim" as const, target: warpEffectAnim }
        ]);

        const blackScreen2ClipBindInfo = new AnimationClipBindInfo([
            { trackName: "black_screen2_opacity" as const, target: blackScreen2 },
            {
                trackName: "black_screen2_activation" as const,
                target: IntroAnimation.createActivationBindInfo(blackScreen2Enable, blackScreen2Disable)
            }
        ]);

        const bindInfo = [
            fireworkClipBindInfo, fireworkClipBindInfo, fireworkClipBindInfo, fireworkClipBindInfo,
            blackScreenClipBindInfo,
            moonClipBindInfo,
            zoomOutClipBindInfo,
            grassClipBindInfo,
            grassClipBindInfo2,
            grassClipBindInfo3,
            spaceshipClipBindInfo,
            warpEffectClipBindInfo,
            blackScreen2ClipBindInfo
        ] as const;
        return bindInfo as RemoveReadonly<typeof bindInfo>;
    }
}

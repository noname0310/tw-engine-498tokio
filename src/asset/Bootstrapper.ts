import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import { AnimationKey, InterpolationKind } from "./script/animation/AnimationKey";
import { AnimationTrack } from "./script/animation/AnimationTrack";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationTrackPlayer } from "./script/AnimationTrackPlayer";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;

        const animationPlayer = new PrefabRef<AnimationTrackPlayer<unknown>>();
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 5;
                }))

            .withChild(instantiater.buildGameObject("test_object")
                .withComponent(CssSpriteRenderer)
                .withComponent(AnimationTrackPlayer, (c: AnimationTrackPlayer<Vector3>) => {
                    const position = c.transform.position;
                    c.animationTarget = value => position.copy(value);
                    let acc = 0;
                    c.animationTrack = AnimationTrack.createVector3Track([
                        AnimationKey.createRefType(acc, new Vector3(0, 0, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, 2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, 2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, -2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(1, 1, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(acc += 100, new Vector3(0, 0, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, 2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, 2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, -2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(1, 1, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(acc += 100, new Vector3(0, 0, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, 2, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, -2, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(-2, 2, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(2, -2, 0), InterpolationKind.Step),
                        AnimationKey.createRefType(acc += 100, new Vector3(1, 1, 0), InterpolationKind.Step)
                    ]);
                    c.play();
                })
                .getComponent(AnimationTrackPlayer, animationPlayer))

            .withChild(instantiater.buildGameObject("animation_control")
                .withComponent(AnimationControl, c => {
                    c.player = animationPlayer.ref;
                    c.playButton = document.getElementById("play_button")! as HTMLButtonElement;
                    c.slider = document.getElementById("animation_slider")! as HTMLInputElement;
                    c.frameDisplayText = document.getElementById("frame_display")! as HTMLInputElement;
                }))
        ;
    }
}

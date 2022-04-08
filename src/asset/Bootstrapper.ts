import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3, Vector2 } from "three/src/Three";
import { testAnimationTrack2 } from "./animation/TestAnimationTrack";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationLoopMode, AnimationTrackPlayer } from "./script/AnimationTrackPlayer";

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
                .withComponent(AnimationTrackPlayer, (c: AnimationTrackPlayer<Vector2>) => {
                    const position = c.transform.position;
                    c.animationTarget = value => { position.x = value.x; position.y = value.y; };
                    c.animationTrack = testAnimationTrack2;
                    c.loopMode = AnimationLoopMode.Loop;
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

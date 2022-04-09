import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3, Quaternion } from "three/src/Three";
import { testAnimationClip1 } from "./animation/TestAnimationClip";
import { BindInfo } from "./script/animation/BindInfo";
import { AnimationClipPlayer } from "./script/AnimationClipPlayer";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationLoopMode } from "./script/AnimationLoopMode";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;

        const animationPlayer = new PrefabRef<AnimationClipPlayer>();
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 5;
                }))

            .withChild(instantiater.buildGameObject("test_object")
                .withComponent(CssSpriteRenderer)
                .withComponent(AnimationClipPlayer, c => {
                    const position = c.transform.position;
                    const rotation = c.transform.rotation;
                    c.setAnimationAndBind(
                        testAnimationClip1, 
                        new BindInfo([
                            { trackName: "position" as const, target: (value: Vector3) => position.copy(value) },
                            { trackName: "rotation" as const, target: (value: Quaternion) => rotation.copy(value) }
                        ])
                    );
                    c.loopMode = AnimationLoopMode.Loop;
                    c.play();
                })
                .getComponent(AnimationClipPlayer, animationPlayer))

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

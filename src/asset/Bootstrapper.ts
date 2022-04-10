import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    GameObject,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3, Quaternion } from "three/src/Three";
import { testAnimationSequnace1 } from "./animation/TestAnimationSequnace";
import { BindInfo } from "./script/animation/BindInfo";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationLoopMode } from "./script/AnimationLoopMode";
import { AnimationSequnacePlayer } from "./script/AnimationSequnacePlayer";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;

        const animationPlayer = new PrefabRef<AnimationSequnacePlayer>();

        const animatedObject1 = new PrefabRef<GameObject>();
        const animatedObject2 = new PrefabRef<GameObject>();
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 5;
                }))

            .withChild(instantiater.buildGameObject("test_object")
                .withComponent(CssSpriteRenderer)
                .getGameObject(animatedObject1))

            .withChild(instantiater.buildGameObject("test_object2")
                .withComponent(CssSpriteRenderer)
                .getGameObject(animatedObject2))
            
            .withChild(instantiater.buildGameObject("sequence_player")
                .withComponent(AnimationSequnacePlayer, c => {
                    const object1_position = animatedObject1.ref!.transform.position;
                    const object1_rotation = animatedObject1.ref!.transform.rotation;
                    const object2_position = animatedObject2.ref!.transform.position;

                    c.setAnimationAndBind(testAnimationSequnace1, [
                        (value: Vector3) => object2_position.copy(value),
                        new BindInfo([
                            { trackName: "position" as const, target: (value: Vector3) => object1_position.copy(value) },
                            { trackName: "rotation" as const, target: (value: Quaternion) => object1_rotation.copy(value) },
                        ]),
                    ]);
                    c.loopMode = AnimationLoopMode.Loop;
                    c.play();
                })
                .getComponent(AnimationSequnacePlayer, animationPlayer))

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

import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    GameObject,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3, Quaternion } from "three/src/Three";
import { testRandomSequence1 } from "./animation/TestAnimationSequnace";
import { AnimationClipBindInfo } from "./script/animation/AnimationClipBindInfo";
import { AnimationEventBindInfo } from "./script/animation/key/AnimationEventKey";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationLoopMode } from "./script/animation/AnimationLoopMode";
import { AnimationSequnacePlayer } from "./script/animation/player/AnimationSequnacePlayer";
import { AudioPlayer } from "./script/audio/AudioPlayer";
import Audio498Tokio from "./audio/498 tokio.mp3";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;

        const audioPlayer = new PrefabRef<AudioPlayer>();
        const animationPlayer = new PrefabRef<AnimationSequnacePlayer>();

        const animatedObject1 = new PrefabRef<GameObject>();
        const animatedObject2 = new PrefabRef<GameObject>();
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 5;
                })
                .withComponent(AudioPlayer, c => {
                    c.asyncSetAudioFromUrl(Audio498Tokio);
                })
                .getComponent(AudioPlayer, audioPlayer))

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

                    c.setAnimationAndBind(testRandomSequence1, [
                        (value: Vector3) => object2_position.copy(value),
                        new AnimationClipBindInfo([
                            { trackName: "position" as const, target: (value: Vector3) => object1_position.copy(value) },
                            { trackName: "rotation" as const, target: (value: Quaternion) => object1_rotation.copy(value) },
                        ]),
                        {
                            event1: new AnimationEventBindInfo(() => console.log("event1"), () => console.log("event1 restore")),
                            event2: new AnimationEventBindInfo(() => console.log("event2")),
                            event3: new AnimationEventBindInfo(() => console.log("event3")),
                            event4: new AnimationEventBindInfo(() => console.log("event4")),
                            event5: new AnimationEventBindInfo(() => console.log("event5")),
                            event6: new AnimationEventBindInfo(() => console.log("event6")),
                            event7: new AnimationEventBindInfo(() => console.log("event7")),
                            event8: new AnimationEventBindInfo(() => console.log("event8")),
                            event9: new AnimationEventBindInfo(() => console.log("event9")),
                            event10: new AnimationEventBindInfo(() => console.log("event10")),
                            event11: new AnimationEventBindInfo(() => console.log("event11")),
                            event12: new AnimationEventBindInfo(() => console.log("event12")),
                            event13: new AnimationEventBindInfo(() => console.log("event13")),
                            event14: new AnimationEventBindInfo(() => console.log("event14")),
                            event15: new AnimationEventBindInfo(() => console.log("event15")),
                            event16: new AnimationEventBindInfo(() => console.log("event16")),
                            event17: new AnimationEventBindInfo(() => console.log("event17")),
                            event18: new AnimationEventBindInfo(() => console.log("event18")),
                            event19: new AnimationEventBindInfo(() => console.log("event19")),
                            event20: new AnimationEventBindInfo(() => console.log("event20")),
                            event21: new AnimationEventBindInfo(() => console.log("event21"))
                        }
                    ]);
                    c.loopMode = AnimationLoopMode.Loop;
                    c.animationClock = audioPlayer.ref!;
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

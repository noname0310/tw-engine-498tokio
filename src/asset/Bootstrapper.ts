import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    Color,
    CssTextRenderer,
    PrefabRef,
    SceneBuilder
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import { AnimationControl } from "./script/AnimationControl";
import { AnimationSequnacePlayer } from "./script/animation/player/AnimationSequnacePlayer";
import { AudioPlayer } from "./script/audio/AudioPlayer";
import { LoadingText } from "./script/LoadingText";
import { IntroObjects, IntroPrefab } from "./prefab/IntroPrefab";
import { IntroAnimation } from "./animation/IntroAnimation";
import Audio498Tokio from "./audio/498 tokio.mp3";
import { AnimationLoopMode } from "./script/animation/AnimationLoopMode";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;

        const introObjects = new PrefabRef<IntroObjects>();

        const audioPlayer = new PrefabRef<AudioPlayer>();
        const animationPlayer = new PrefabRef<AnimationSequnacePlayer>();
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 7;
                    c.backgroundColor = new Color(0, 0, 0);
                })
                .withComponent(CssTextRenderer, c => {
                    c.text = "Decoding Audio Data";
                    c.textColor = new Color(1, 1, 1);
                    c.autoSize = true;
                })
                .withComponent(LoadingText, c => {
                    c.text = "Decoding Audio Data";
                })
                .withComponent(AudioPlayer, c => {
                    c.asyncSetAudioFromUrl(Audio498Tokio, () => {
                        c.gameObject.getComponent(CssTextRenderer)!.destroy();
                        c.gameObject.getComponent(LoadingText)!.destroy();
                    });
                })
                .getComponent(AudioPlayer, audioPlayer))

            .withChild(instantiater.buildPrefab("intro", IntroPrefab)
                .getObjects(introObjects).make())
            
            .withChild(instantiater.buildGameObject("sequence_player")
                .withComponent(AnimationSequnacePlayer, c => {
                    const firework1Render = introObjects.ref!.fireWork1.ref!;
                    const firework2Render = introObjects.ref!.fireWork2.ref!;
                    const firework3Render = introObjects.ref!.fireWork3.ref!;
                    const fireworkSphereRender = introObjects.ref!.fireworkSphere.ref!;
                    const blackScreen = introObjects.ref!.blackScreen.ref!;
                    const moon = introObjects.ref!.moon.ref!;
                    const moonFilter = moon.filter;
                    const moonGroupScale = introObjects.ref!.moonGroup.ref!.transform.localScale;
                    const grassPosition = introObjects.ref!.grass.ref!.transform.position;
                    const grassRender = introObjects.ref!.grassRender.ref!;

                    c.animationClock = audioPlayer.ref!;
                    c.setAnimationAndBind(
                        IntroAnimation.sequance,
                        IntroAnimation.createBindInfo(
                            (value: number) => firework1Render.imageIndex = value,
                            () => firework1Render.enabled = true,
                            () => firework1Render.enabled = false,
                            (value: number) => firework2Render.imageIndex = value,
                            () => firework2Render.enabled = true,
                            () => firework2Render.enabled = false,
                            (value: number) => firework3Render.imageIndex = value,
                            () => firework3Render.enabled = true,
                            () => firework3Render.enabled = false,
                            (value: number) => fireworkSphereRender.imageIndex = value,
                            () => fireworkSphereRender.enabled = true,
                            () => fireworkSphereRender.enabled = false,
                            (value: number) => blackScreen.element!.style.opacity = value.toString(),
                            () => blackScreen.enabled = true,
                            () => blackScreen.enabled = false,
                            (value: number) => moonFilter.hueRotate = value,
                            (value: number) => moonGroupScale.setScalar(value),
                            (value: number) => grassRender.gradient = value,
                            (value: number) => grassPosition.y = value,
                        )
                    );
                    c.frameRate = 30;
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
                    c.slider.value = "0";
                }))
        ;
    }
}

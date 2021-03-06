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
import { ScreenOverlay } from "./script/render/ScreenOverlay";
import { NumberStringPool } from "./script/NumberStringPool";

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
                        if (!c.exists) return;
                        c.gameObject.getComponent(CssTextRenderer)!.destroy();
                        c.gameObject.getComponent(LoadingText)!.destroy();
                    });
                })
                .withComponent(ScreenOverlay, c => {
                    const div = document.createElement("div");
                    div.style.boxShadow = "0 0 20px rgba(0,0,0,0.9) inset";
                    c.cssHtmlElementRenderer!.element = div;
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
                    const grass1Position = introObjects.ref!.grass1.ref!.transform.position;
                    const grass1Render = introObjects.ref!.grassRender1.ref!;
                    const grass2Position = introObjects.ref!.grass2.ref!.transform.position;
                    const grass2Render = introObjects.ref!.grassRender2.ref!;
                    const grass3Position = introObjects.ref!.grass3.ref!.transform.position;
                    const grass3Render = introObjects.ref!.grassRender3.ref!;
                    const spaceshipPosition = introObjects.ref!.spaceship.ref!.transform.position;
                    const spaceshipRotate = introObjects.ref!.spaceship.ref!.transform.eulerAngles;
                    const warpEffect = introObjects.ref!.warpEffect.ref!;
                    const warpEffectAnim = introObjects.ref!.warpEffectAnim.ref!.animationInstance!;
                    const blackScreen2 = introObjects.ref!.blackScreen2.ref!;

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
                            (value: number) => blackScreen.element!.style.opacity = NumberStringPool.get(value),
                            () => blackScreen.enabled = true,
                            () => blackScreen.enabled = false,
                            (value: number) => moonFilter.hueRotate = value,
                            (value: number) => moonGroupScale.setScalar(value),
                            (value: number) => grass1Render.gradient = value,
                            (value: number) => grass1Position.y = value,
                            (value: number) => grass2Render.gradient = value,
                            (value: number) => grass2Position.y = value,
                            (value: number) => grass3Render.gradient = value,
                            (value: number) => grass3Position.y = value,
                            (value: number) => spaceshipPosition.y = value,
                            (value: number) => spaceshipRotate.z = value,
                            () => warpEffect.activeSelf = true,
                            () => warpEffect.activeSelf = false,
                            (value: number) => warpEffectAnim.process(value),
                            (value: number) => blackScreen2.element!.style.opacity = NumberStringPool.get(value),
                            () => blackScreen2.enabled = true,
                            () => blackScreen2.enabled = false
                        )
                    );
                    c.frameRate = 30;
                    c.loopMode = AnimationLoopMode.None;
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

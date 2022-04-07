import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    SceneBuilder
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import { AnimationKey, InterpolationKind } from "./script/animation/AnimationKey";
import { AnimationTrack } from "./script/animation/AnimationTrack";
import { AnimationTrackPlayer } from "./script/AnimationTrackPlayer";

export class Bootstrapper extends BaseBootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;
        
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
                    c.animationTrack = AnimationTrack.createVector3Track([
                        AnimationKey.createRefType(0, new Vector3(0, 0, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(100, new Vector3(2, 2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(200, new Vector3(-2, -2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(300, new Vector3(-2, 2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(400, new Vector3(2, -2, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(500, new Vector3(1, 1, 0), InterpolationKind.Cubic, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
                        AnimationKey.createRefType(600, new Vector3(0, 0, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(700, new Vector3(2, 2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(800, new Vector3(-2, -2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(900, new Vector3(-2, 2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(1000, new Vector3(2, -2, 0), InterpolationKind.Linear),
                        AnimationKey.createRefType(1100, new Vector3(1, 1, 0), InterpolationKind.Linear)
                    ]);
                    c.play();
                }));
    }
}

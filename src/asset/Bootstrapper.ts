import { 
    Bootstrapper as BaseBootstrapper,
    Camera,
    CssSpriteRenderer,
    SceneBuilder
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import { AnimationKey } from "./script/animation/AnimationKey";
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
                .withComponent(AnimationTrackPlayer, c => {
                    c.animationTarget = c.transform.position;
                    c.animationTrack = new AnimationTrack([
                        new AnimationKey(0, new Vector3(0, 0, 0)),
                        new AnimationKey(1, new Vector3(1, 1, 1)),
                        new AnimationKey(2, new Vector3(2, 2, 2)),
                        new AnimationKey(3, new Vector3(3, 3, 3)),
                        new AnimationKey(4, new Vector3(4, 4, 4)),
                        new AnimationKey(5, new Vector3(5, 5, 5))
                    ]);
                }));
    }
}

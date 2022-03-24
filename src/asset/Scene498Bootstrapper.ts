import { 
    Bootstrapper,
    Camera,
    CssSpriteRenderer,
    SceneBuilder
} from "the-world-engine";
import { Vector3 } from "three/src/Three";

export class Scene498Bootstrapper extends Bootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.instantiater;
        
        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 5;
                }))

            .withChild(instantiater.buildGameObject("test_object")
                .withComponent(CssSpriteRenderer));
    }
}

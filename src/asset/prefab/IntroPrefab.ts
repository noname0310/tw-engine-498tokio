import {
    CssSpriteAtlasRenderer,
    GameObjectBuilder,
    Prefab,
    PrefabRef
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import ImageFirework1 from "../image/firework1.png";
import ImageFirework2 from "../image/firework2.png";
import ImageFirework3 from "../image/firework3.png";
import ImageFireworkSphere from "../image/firework_sphere.png";

export type IntroObjects = {
    fireWork1: PrefabRef<CssSpriteAtlasRenderer>;
    fireWork2: PrefabRef<CssSpriteAtlasRenderer>;
    fireWork3: PrefabRef<CssSpriteAtlasRenderer>;
    fireworkSphere: PrefabRef<CssSpriteAtlasRenderer>;
};

export class IntroPrefab extends Prefab {
    private _fireWork1 = new PrefabRef<CssSpriteAtlasRenderer>();
    private _fireWork2 = new PrefabRef<CssSpriteAtlasRenderer>();
    private _fireWork3 = new PrefabRef<CssSpriteAtlasRenderer>();
    private _fireWorkSphere = new PrefabRef<CssSpriteAtlasRenderer>();

    public getObjects(introObjects: PrefabRef<IntroObjects>): this {
        introObjects.ref = {
            fireWork1: this._fireWork1,
            fireWork2: this._fireWork2,
            fireWork3: this._fireWork3,
            fireworkSphere: this._fireWorkSphere
        };

        return this;
    }

    public override make(): GameObjectBuilder {
        return this.gameObjectBuilder
            .withChild(this.instantiater.buildGameObject("firework1", new Vector3(-4, 4, 0))
                .withComponent(CssSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework1, 1, 8);
                })
                .getComponent(CssSpriteAtlasRenderer, this._fireWork1))

            .withChild(this.instantiater.buildGameObject("firework2", new Vector3(-2, -4, 0))
                .withComponent(CssSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework2, 1, 18);
                })
                .getComponent(CssSpriteAtlasRenderer, this._fireWork2))

            .withChild(this.instantiater.buildGameObject("firework3", new Vector3(4.5, 3.5, 0))
                .withComponent(CssSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework3, 1, 14);
                })
                .getComponent(CssSpriteAtlasRenderer, this._fireWork3))

            .withChild(this.instantiater.buildGameObject("fireworkSphere", new Vector3(0, 0, 0), undefined, new Vector3().setScalar(2))
                .withComponent(CssSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFireworkSphere, 1, 13);
                })
                .getComponent(CssSpriteAtlasRenderer, this._fireWorkSphere))
        ;
    }
}

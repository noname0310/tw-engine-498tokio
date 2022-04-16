import {
    GameObjectBuilder,
    Prefab,
    PrefabRef
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import ImageFirework1 from "../image/firework1.png";
import ImageFirework2 from "../image/firework2.png";
import ImageFirework3 from "../image/firework3.png";
import ImageFireworkSphere from "../image/firework_sphere.png";
import { GlowSpriteAtlasRenderer } from "../script/render/GlowSpriteAtlasRenderer";

export type IntroObjects = {
    fireWork1: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork2: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork3: PrefabRef<GlowSpriteAtlasRenderer>;
    fireworkSphere: PrefabRef<GlowSpriteAtlasRenderer>;
};

export class IntroPrefab extends Prefab {
    private _fireWork1 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork2 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork3 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWorkSphere = new PrefabRef<GlowSpriteAtlasRenderer>();

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
            .withChild(this.instantiater.buildGameObject("firework1", new Vector3(-3, 3, 0))
                .withComponent(GlowSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework1, 1, 8);
                })
                .getComponent(GlowSpriteAtlasRenderer, this._fireWork1))

            .withChild(this.instantiater.buildGameObject("firework2", new Vector3(-2, -4, 0))
                .withComponent(GlowSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework2, 1, 18);
                })
                .getComponent(GlowSpriteAtlasRenderer, this._fireWork2))

            .withChild(this.instantiater.buildGameObject("firework3", new Vector3(4.5, 3.5, 0))
                .withComponent(GlowSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFirework3, 1, 14);
                })
                .getComponent(GlowSpriteAtlasRenderer, this._fireWork3))

            .withChild(this.instantiater.buildGameObject("fireworkSphere", new Vector3(0, 0, 0), undefined, new Vector3().setScalar(2))
                .withComponent(GlowSpriteAtlasRenderer, c => {
                    c.viewScale = 1;
                    c.asyncSetImage(ImageFireworkSphere, 1, 13);
                })
                .getComponent(GlowSpriteAtlasRenderer, this._fireWorkSphere))
        ;
    }
}

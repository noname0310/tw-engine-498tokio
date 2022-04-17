import {
    CssDropShadow,
    CssHtmlElementRenderer,
    CssSpriteRenderer,
    GameObject,
    GameObjectBuilder,
    Prefab,
    PrefabRef
} from "the-world-engine";
import { Vector3 } from "three/src/Three";
import { GlowSpriteAtlasRenderer } from "../script/render/GlowSpriteAtlasRenderer";
import ImageFirework1 from "../image/firework1.png";
import ImageFirework2 from "../image/firework2.png";
import ImageFirework3 from "../image/firework3.png";
import ImageFireworkSphere from "../image/firework_sphere.png";
import ImageMoon from "../image/moon.png";

export type IntroObjects = {
    moonGroup: PrefabRef<GameObject>;
    fireWork1: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork2: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork3: PrefabRef<GlowSpriteAtlasRenderer>;
    fireworkSphere: PrefabRef<GlowSpriteAtlasRenderer>;
    blackScreen: PrefabRef<CssHtmlElementRenderer>;
    moon: PrefabRef<CssSpriteRenderer>;
};

export class IntroPrefab extends Prefab {
    private _moonGroup = new PrefabRef<GameObject>();
    private _fireWork1 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork2 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork3 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWorkSphere = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _blackScreen = new PrefabRef<CssHtmlElementRenderer>();
    private _moon = new PrefabRef<CssSpriteRenderer>();

    public getObjects(introObjects: PrefabRef<IntroObjects>): this {
        introObjects.ref = {
            moonGroup: this._moonGroup,
            fireWork1: this._fireWork1,
            fireWork2: this._fireWork2,
            fireWork3: this._fireWork3,
            fireworkSphere: this._fireWorkSphere,
            blackScreen: this._blackScreen,
            moon: this._moon
        };

        return this;
    }

    public override make(): GameObjectBuilder {
        return this.gameObjectBuilder
            .withChild(this.instantiater.buildGameObject("moon_group", new Vector3(0, 0, 2))
                .getGameObject(this._moonGroup)

                .withChild(this.instantiater.buildGameObject("firework1", new Vector3(-3, 3, 0))
                    .withComponent(GlowSpriteAtlasRenderer, c => {
                        c.viewScale = 1;
                        c.asyncSetImage(ImageFirework1, 1, 8);
                    })
                    .getComponent(GlowSpriteAtlasRenderer, this._fireWork1))

                .withChild(this.instantiater.buildGameObject("firework2", new Vector3(-2, -3.5, 0))
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
                    
                .withChild(this.instantiater.buildGameObject("moon", new Vector3(0, 0, -2), undefined, new Vector3().setScalar(2))
                    .withComponent(CssSpriteRenderer, c => {
                        c.asyncSetImagePath(ImageMoon);
                        c.filter.dropShadow = new CssDropShadow(0.3, 0.7, 1);
                    })
                    .getComponent(CssSpriteRenderer, this._moon)))

            .withChild(this.instantiater.buildGameObject("black_screen", new Vector3(0, 0, 1))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "#000000";
                    c.element = div;
                    c.elementWidth = 1000;
                    c.elementHeight = 1000;
                })
                .getComponent(CssHtmlElementRenderer, this._blackScreen))
        ;
    }
}
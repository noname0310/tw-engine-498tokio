import {
    Color,
    CssDropShadow,
    CssHtmlElementRenderer,
    CssSpriteRenderer,
    CssTilemapRenderer,
    GameObject,
    GameObjectBuilder,
    Prefab,
    PrefabRef,
    TileAtlasItem
} from "the-world-engine";
import { Vector3, Vector2 } from "three/src/Three";
import { GlowSpriteAtlasRenderer } from "../script/render/GlowSpriteAtlasRenderer";
import { HorizontalObjectsAnimator } from "../script/render/HorizontalObjectsAnimator";
import ImageFirework1 from "../image/firework1.png";
import ImageFirework2 from "../image/firework2.png";
import ImageFirework3 from "../image/firework3.png";
import ImageFireworkSphere from "../image/firework_sphere.png";
import ImageMoon from "../image/moon.png";
import ImageMoonEmission from "../image/moon_emission.png";
import ImageBackground from "../image/intro_background.jpg";
import ImageGrass from "../image/grass.png";
import ImageSpaceshipBlue from "../image/spaceship_blue.png";
import ImageRedHelmet from "../image/red_helmet.png";

export type IntroObjects = {
    moonGroup: PrefabRef<GameObject>;
    fireWork1: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork2: PrefabRef<GlowSpriteAtlasRenderer>;
    fireWork3: PrefabRef<GlowSpriteAtlasRenderer>;
    fireworkSphere: PrefabRef<GlowSpriteAtlasRenderer>;
    blackScreen: PrefabRef<CssHtmlElementRenderer>;
    moon: PrefabRef<CssSpriteRenderer>;
    grass1: PrefabRef<GameObject>;
    grassRender1: PrefabRef<HorizontalObjectsAnimator>;
    grass2: PrefabRef<GameObject>;
    grassRender2: PrefabRef<HorizontalObjectsAnimator>;
    grass3: PrefabRef<GameObject>;
    grassRender3: PrefabRef<HorizontalObjectsAnimator>;
    spaceship: PrefabRef<GameObject>;
};

export class IntroPrefab extends Prefab {
    private _moonGroup = new PrefabRef<GameObject>();
    private _fireWork1 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork2 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWork3 = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _fireWorkSphere = new PrefabRef<GlowSpriteAtlasRenderer>();
    private _blackScreen = new PrefabRef<CssHtmlElementRenderer>();
    private _moon = new PrefabRef<CssSpriteRenderer>();
    private _grass1 = new PrefabRef<GameObject>();
    private _grassRender1 = new PrefabRef<HorizontalObjectsAnimator>();
    private _grass2 = new PrefabRef<GameObject>();
    private _grassRender2 = new PrefabRef<HorizontalObjectsAnimator>();
    private _grass3 = new PrefabRef<GameObject>();
    private _grassRender3 = new PrefabRef<HorizontalObjectsAnimator>();
    private _spaceship = new PrefabRef<GameObject>();

    public getObjects(introObjects: PrefabRef<IntroObjects>): this {
        introObjects.ref = {
            moonGroup: this._moonGroup,
            fireWork1: this._fireWork1,
            fireWork2: this._fireWork2,
            fireWork3: this._fireWork3,
            fireworkSphere: this._fireWorkSphere,
            blackScreen: this._blackScreen,
            moon: this._moon,
            grass1: this._grass1,
            grassRender1: this._grassRender1,
            grass2: this._grass2,
            grassRender2: this._grassRender2,
            grass3: this._grass3,
            grassRender3: this._grassRender3,
            spaceship: this._spaceship
        };

        return this;
    }

    public override make(): GameObjectBuilder {
        return this.gameObjectBuilder
            .withChild(this.instantiater.buildGameObject("moon_group", new Vector3(0, 0, -7))
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
                    .getComponent(CssSpriteRenderer, this._moon)
                    .withComponent(CssSpriteRenderer, c => {
                        c.asyncSetImagePath(ImageMoonEmission);
                        c.filter.blur = 1;
                        c.filter.dropShadow = new CssDropShadow(-0.3, -0.3, 1, new Color(1, 1, 1));
                    })))

            .withChild(this.instantiater.buildGameObject("black_screen", new Vector3(0, 0, -8))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "#000000";
                    c.element = div;
                    c.elementWidth = 1000;
                    c.elementHeight = 1000;
                })
                .getComponent(CssHtmlElementRenderer, this._blackScreen))

            .withChild(this.instantiater.buildGameObject("background", new Vector3(0, 0, -10), undefined, new Vector3().setScalar(1.55))
                .withComponent(CssTilemapRenderer, c => {
                    c.tileResolutionX = 4;
                    c.tileResolutionY = 36;
                    c.gridCellWidth = 4 / 4;
                    c.gridCellHeight = 36 / 4;

                    c.columnCount = 40;
                    c.rowCount = 1;
                    

                    const tile = new Image();
                    tile.src = ImageBackground;

                    tile.onload = () => {
                        c.imageSources = [new TileAtlasItem(tile)];
                        
                        const x = { i: 0, a: 0};
                        c.drawTileFromTwoDimensionalArray([
                            Array(c.columnCount).fill(x),
                        ], 0, 0);
                    };
                }))

            .withChild(this.instantiater.buildGameObject("grass1", new Vector3(-30, -17, -4), undefined, new Vector3().setScalar(6.1))
                .withComponent(HorizontalObjectsAnimator, c => {
                    c.prefab = class extends Prefab {
                        public make(): GameObjectBuilder {
                            return this.gameObjectBuilder
                                .withComponent(CssSpriteRenderer, c => {
                                    c.asyncSetImagePath(ImageGrass);
                                    c.centerOffset = new Vector2(0, 0.5);
                                    c.filter.blur = 0.1;
                                });
                        }
                    };

                    c.spawnCount = 7;
                    c.padding = 1.57;
                })
                .getComponent(HorizontalObjectsAnimator, this._grassRender1)
                .getGameObject(this._grass1))
                
            .withChild(this.instantiater.buildGameObject("grass2", new Vector3(-30, -14, -5), undefined, new Vector3().setScalar(4))
                .withComponent(HorizontalObjectsAnimator, c => {
                    c.prefab = class extends Prefab {
                        public make(): GameObjectBuilder {
                            return this.gameObjectBuilder
                                .withComponent(CssSpriteRenderer, c => {
                                    c.asyncSetImagePath(ImageGrass);
                                    c.centerOffset = new Vector2(0, 0.5);
                                    c.filter.blur = 0.1;
                                    c.filter.brightness = 0.7;
                                });
                        }
                    };

                    c.spawnCount = 11;
                    c.padding = 1.57;
                })
                .getComponent(HorizontalObjectsAnimator, this._grassRender2)
                .getGameObject(this._grass2))

            .withChild(this.instantiater.buildGameObject("grass3", new Vector3(-30, -12, -6), undefined, new Vector3().setScalar(2))
                .withComponent(HorizontalObjectsAnimator, c => {
                    c.prefab = class extends Prefab {
                        public make(): GameObjectBuilder {
                            return this.gameObjectBuilder
                                .withComponent(CssSpriteRenderer, c => {
                                    c.asyncSetImagePath(ImageGrass);
                                    c.centerOffset = new Vector2(0, 0.5);
                                    c.filter.blur = 0.05;
                                    c.filter.brightness = 0.6;
                                });
                        }
                    };

                    c.spawnCount = 14;
                    c.padding = 1.57;
                })
                .getComponent(HorizontalObjectsAnimator, this._grassRender3)
                .getGameObject(this._grass3))

            .withChild(this.instantiater.buildGameObject("space_ship", new Vector3(-0.1, -9, -7), undefined, new Vector3().setScalar(0.4))
                .withComponent(CssSpriteRenderer, c => {
                    c.asyncSetImagePath(ImageSpaceshipBlue);
                    c.filter.brightness = 0;
                })
                .withChild(this.instantiater.buildGameObject("red_helmet", new Vector3(-0.45, 0, -1))
                    .withComponent(CssSpriteRenderer, c => {
                        c.asyncSetImagePath(ImageRedHelmet);
                        c.filter.brightness = 0;
                    }))
                .getGameObject(this._spaceship))
        ;
    }
}

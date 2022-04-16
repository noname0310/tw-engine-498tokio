import { Component, CssSpriteAtlasRenderer } from "the-world-engine";

export class GlowSpriteAtlasRenderer extends Component {
    private _sprite: CssSpriteAtlasRenderer|null = null;
    private _blurSprite: CssSpriteAtlasRenderer|null = null;
    private _viewScale = 1;
    private _glowScale = 1;
    private _imageIndex = 0;

    public awake(): void {
        if (!this._sprite) {
            this._sprite = this.gameObject.addComponent(CssSpriteAtlasRenderer);
            this._blurSprite = this.gameObject.addComponent(CssSpriteAtlasRenderer);
        }
        this._sprite!.viewScale = this._viewScale;
        this._blurSprite!.viewScale = this._viewScale;
        this._blurSprite!.blur = this._glowScale;
    }

    public onEnable(): void {
        if (this._sprite) {
            this._sprite!.enabled = true;
            this._blurSprite!.enabled = true;
        }
    }

    public onDisable(): void {
        if (this._sprite) {
            this._sprite!.enabled = false;
            this._blurSprite!.enabled = false;
        }
    }

    public onDestroy(): void {
        if (this._sprite) {
            this._sprite!.destroy();
            this._blurSprite!.destroy();
        }
    }

    public asyncSetImage(src: string, width: number, height: number, onComplete?: () => void): void {
        if (!this._sprite) {
            this._sprite = this.gameObject.addComponent(CssSpriteAtlasRenderer);
            this._blurSprite = this.gameObject.addComponent(CssSpriteAtlasRenderer);
        }
        this._sprite!.asyncSetImage(src, width, height, onComplete);
        this._blurSprite!.asyncSetImage(src, width, height, onComplete);
    }

    public set imageIndex(value: number) {
        this._imageIndex = value;
        if (this._sprite) {
            this._sprite.imageIndex = value;
            this._blurSprite!.imageIndex = value;
        }
    }

    public get imageIndex(): number {
        return this._imageIndex;
    }

    public get viewScale(): number {
        return this._viewScale;
    }

    public set viewScale(value: number) {
        this._viewScale = value;
        if (this._sprite) {
            this._sprite.viewScale = value;
            this._blurSprite!.viewScale = value;
        }
    }
}

import { Camera, Component, CssHtmlElementRenderer } from "the-world-engine";

export class ScreenOverlay extends Component {
    public override readonly requiredComponents = [Camera];

    private _camera: Camera|null = null;
    private _htmlRenderer: CssHtmlElementRenderer|null = null;

    public awake(): void {
        this.engine.screen.onResize.addListener(this.onScreenResize);

        this._camera = this.gameObject.getComponent(Camera);
        const renderer = this.createRenderer();
        const viewSize = this._camera!.viewSize;
        const screen = this.engine.screen;
        const aspect = screen.width / screen.height;
        renderer.elementWidth = viewSize * 2 * aspect;
        renderer.elementHeight = viewSize * 2;
    }

    private createRenderer(): CssHtmlElementRenderer {
        if (this._htmlRenderer) return this._htmlRenderer;

        this._htmlRenderer = this.gameObject.addComponent(CssHtmlElementRenderer);
        this._htmlRenderer!.enabled = this.enabled;
        return this._htmlRenderer!;
    }

    public onEnable(): void {
        if (this._htmlRenderer!.exists) {
            this._htmlRenderer!.enabled = true;
        }
    }

    public onDisable(): void {
        if (this._htmlRenderer!.exists) {
            this._htmlRenderer!.enabled = false;
        }
    }

    public onDestroy(): void {
        this.engine.screen.onResize.removeListener(this.onScreenResize);

        if (this._htmlRenderer) {
            this._htmlRenderer.destroy();
            this._htmlRenderer = null;
        }
    }

    private readonly onScreenResize = (width: number, height: number): void => {
        if (this._htmlRenderer) {
            const viewSize = this._camera!.viewSize;
            const aspect = width / height;
            this._htmlRenderer!.elementWidth = viewSize * 2 * aspect;
            this._htmlRenderer!.elementHeight = viewSize * 2;
        }
    };

    public get cssHtmlElementRenderer(): CssHtmlElementRenderer {
        return this.createRenderer();
    }
}

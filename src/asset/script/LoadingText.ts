import { Component, CssTextRenderer } from "the-world-engine";

export class LoadingText extends Component {
    public override readonly requiredComponents = [CssTextRenderer];

    public text = "Loading";
    private _textRenderer: CssTextRenderer|null = null;
    private _elapsedTime = 0;
    private _dotCount = 1;

    public awake(): void {
        this._textRenderer = this.gameObject.getComponent(CssTextRenderer);
    }

    public update(): void {
        this._elapsedTime += this.engine.time.deltaTime;
        if (this._elapsedTime > 0.5) {
            this._elapsedTime = 0;
            this._textRenderer!.text = this.text + ".".repeat(this._dotCount);

            this._dotCount %= 3;
            this._dotCount += 1;
        }
    }
}
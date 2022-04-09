import { Component } from "the-world-engine";
import { IAnimationPlayer } from "./IAnimationPlayer";

export class AnimationControl extends Component {
    private _player: IAnimationPlayer|null = null;
    private _slider: HTMLInputElement|null = null;
    private _playButton: HTMLButtonElement|null = null;
    private _frameDisplayText: HTMLSpanElement|null = null;

    public onDestroy(): void {
        if (this._player) {
            this._player.onAnimationProcess.removeListener(this.onAnimationProcess);
            this._player.onAnimationStart.removeListener(this.onAnimationStart);
            this._player.onAnimationPaused.removeListener(this.onAnimationPaused);
            this._player.onAnimationEnd.removeListener(this.onAnimationEnd);
        }

        if (this._slider) {
            this._slider.removeEventListener("input", this.onSliderInput);
            this._slider.removeEventListener("onmousedown", this.onSliderMouseDown);
            this._slider.removeEventListener("onmouseup", this.onSliderMouseUp);
        }

        if (this._playButton) {
            this._playButton.removeEventListener("click", this.onPlayButtonClick);
        }

        this._player = null;
        this._slider = null;
        this._playButton = null;
        this._frameDisplayText = null;
    }

    public get player(): IAnimationPlayer|null {
        return this._player;
    }

    public set player(player: IAnimationPlayer|null) {
        if (this._player) {
            this._player.onAnimationProcess.removeListener(this.onAnimationProcess);
            this._player.onAnimationStart.removeListener(this.onAnimationStart);
            this._player.onAnimationPaused.removeListener(this.onAnimationPaused);
            this._player.onAnimationEnd.removeListener(this.onAnimationEnd);
        }

        this._player = player;
        if (!player) return;

        player.onAnimationProcess.addListener(this.onAnimationProcess);
        player.onAnimationStart.addListener(this.onAnimationStart);
        player.onAnimationPaused.addListener(this.onAnimationPaused);
        player.onAnimationEnd.addListener(this.onAnimationEnd);

        if (!this._playButton) return;
        if (player.isPlaying) {
            this._playButton.textContent = "Stop";
        } else {
            this._playButton.textContent = "Play";
        }
    }

    public get slider(): HTMLInputElement|null {
        return this._slider;
    }

    public set slider(slider: HTMLInputElement|null) {
        this._slider = slider;
        if (!this._slider) return;
        if (this._player) this._slider.max = this._player.animationContainer?.endFrame.toString() ?? "0";
        this._slider.addEventListener("input", this.onSliderInput);
        this._slider.addEventListener("mousedown", this.onSliderMouseDown);
        this._slider.addEventListener("mouseup", this.onSliderMouseUp);
    }

    public get playButton(): HTMLButtonElement|null {
        return this._playButton;
    }

    public set playButton(playButton: HTMLButtonElement|null) {
        this._playButton = playButton;
        if (!this._playButton) return;
        if (this._player) {
            if (this._player.isPlaying) {
                this._playButton.textContent = "Stop";
            } else {
                this._playButton.textContent = "Play";
            }
        }
        this._playButton.addEventListener("click", this.onPlayButtonClick);
    }

    public get frameDisplayText(): HTMLSpanElement|null {
        return this._frameDisplayText;
    }

    public set frameDisplayText(frameDisplayText: HTMLSpanElement|null) {
        this._frameDisplayText = frameDisplayText;
    }

    private onSliderInput = (event: Event): void => {
        if (!this._player) return;
        const value = (event.target as HTMLInputElement).valueAsNumber;
        if (this._player.isPlaying) {
            this._player.frameTime = value;
        } else {
            this._player.process(value);
            this._player.frameTime = value;
        }
    };

    private _pausedBySlider = false;

    private onSliderMouseDown = (_event: Event): void => {
        if (!this._player) return;
        if (this._player.isPlaying) {
            this._pausedBySlider = true;
            this._player.pause();
        }
    };

    private onSliderMouseUp = (_event: Event): void => {
        if (!this._player) return;
        if (this._pausedBySlider) {
            this._pausedBySlider = false;
            this._player.play();
        }
    };

    private onPlayButtonClick = (_event: Event): void => {
        if (!this._player) return;
        if (this._player.isPlaying) {
            this._player.pause();
        } else {
            this._player.play();
        }
    };

    private onAnimationProcess = (frameTime: number): void => {
        if (!this._slider) return;
        this._slider.value = frameTime.toString();
        if (this._frameDisplayText) this._frameDisplayText.textContent = Math.floor(frameTime).toString();
    };

    private onAnimationStart = (): void => {
        if (!this._playButton) return;
        this._playButton.textContent = "Stop";
    };

    private onAnimationPaused = (): void => {
        if (!this._playButton) return;
        if (this._pausedBySlider) return;
        this._playButton.textContent = "Play";
    };

    private onAnimationEnd = (): void => {
        if (!this._playButton) return;
        this._playButton.textContent = "Play";
    };
}

import { Component } from "the-world-engine";
import { IAnimationContainer } from "./animation/container/IAnimationContainer";
import { IAnimationPlayer } from "./animation/player/IAnimationPlayer";

export class AnimationControl extends Component {
    private _player: IAnimationPlayer|null = null;
    private _slider: HTMLInputElement|null = null;
    private _playbackRateSlider: HTMLInputElement|null = null;
    private _playButton: HTMLButtonElement|null = null;
    private _frameDisplayText: HTMLSpanElement|null = null;
    
    private _ready = false;

    public onEnable(): void {
        this._ready = true;

        if (this._player) {
            this._player.onAnimationProcess.addListener(this.onAnimationProcess);
            this._player.onAnimationStart.addListener(this.onAnimationStart);
            this._player.onAnimationPaused.addListener(this.onAnimationPaused);
            this._player.onAnimationEnd.addListener(this.onAnimationEnd);
            this._player.onAnimationChanged.addListener(this.onAnimationChanged);
        }

        if (this._slider) {
            this._slider.addEventListener("input", this.onSliderInput);
            this._slider.addEventListener("mousedown", this.onSliderMouseDown);
            this._slider.addEventListener("mouseup", this.onSliderMouseUp);
        }

        if (this._playbackRateSlider) {
            this._playbackRateSlider.addEventListener("input", this.onPlaybackRateSliderInput);
        }

        if (this._playButton) {
            this._playButton.addEventListener("click", this.onPlayButtonClick);
        }
    }

    public onDisable(): void {
        this._ready = false;

        if (this._player) {
            this._player.onAnimationProcess.removeListener(this.onAnimationProcess);
            this._player.onAnimationStart.removeListener(this.onAnimationStart);
            this._player.onAnimationPaused.removeListener(this.onAnimationPaused);
            this._player.onAnimationEnd.removeListener(this.onAnimationEnd);
            this._player.onAnimationChanged.removeListener(this.onAnimationChanged);
        }

        if (this._slider) {
            this._slider.removeEventListener("input", this.onSliderInput);
            this._slider.removeEventListener("mousedown", this.onSliderMouseDown);
            this._slider.removeEventListener("mouseup", this.onSliderMouseUp);
        }

        if (this._playbackRateSlider) {
            this._playbackRateSlider.removeEventListener("input", this.onPlaybackRateSliderInput);
        }

        if (this._playButton) {
            this._playButton.removeEventListener("click", this.onPlayButtonClick);
        }
    }

    public onDestroy(): void {
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
            this._player.onAnimationChanged.removeListener(this.onAnimationChanged);
        }

        this._player = player;
        if (!player) return;

        if (this._ready) {
            player.onAnimationProcess.addListener(this.onAnimationProcess);
            player.onAnimationStart.addListener(this.onAnimationStart);
            player.onAnimationPaused.addListener(this.onAnimationPaused);
            player.onAnimationEnd.addListener(this.onAnimationEnd);
            player.onAnimationChanged.addListener(this.onAnimationChanged);
        }

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
        if (!slider) return;
        if (this._player) {
            slider.min = this._player.animationContainer?.startFrame.toString() ?? "0";
            slider.max = this._player.animationContainer?.endFrame.toString() ?? "0";
        }

        if (this._ready) {
            slider.addEventListener("input", this.onSliderInput);
            slider.addEventListener("mousedown", this.onSliderMouseDown);
            slider.addEventListener("mouseup", this.onSliderMouseUp);
        }
    }

    public get playbackRateSlider(): HTMLInputElement|null {
        return this._playbackRateSlider;
    }

    public set playbackRateSlider(playbackRateSlider: HTMLInputElement|null) {
        this._playbackRateSlider = playbackRateSlider;
        if (!playbackRateSlider) return;
        if (this._player && this._player.animationClock) {
            this._player.animationClock.playbackRate = parseFloat(playbackRateSlider.value);
        }

        if (this._ready) {
            playbackRateSlider.addEventListener("input", this.onPlaybackRateSliderInput);
        }
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

        if (this._ready) {
            this._playButton.addEventListener("click", this.onPlayButtonClick);
        }
    }

    public get frameDisplayText(): HTMLSpanElement|null {
        return this._frameDisplayText;
    }

    public set frameDisplayText(frameDisplayText: HTMLSpanElement|null) {
        this._frameDisplayText = frameDisplayText;
    }

    private readonly onSliderInput = (event: Event): void => {
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

    private readonly onSliderMouseDown = (_event: Event): void => {
        if (!this._player) return;
        if (this._player.isPlaying) {
            this._pausedBySlider = true;
            this._player.pause();
        }
    };

    private readonly onSliderMouseUp = (_event: Event): void => {
        if (!this._player) return;
        if (this._pausedBySlider) {
            this._pausedBySlider = false;
            this._player.play();
        }
    };

    private readonly onPlaybackRateSliderInput = (event: Event): void => {
        if (!this._player) return;
        if (this._player.animationClock) {
            this._player.animationClock.playbackRate = parseFloat((event.target as HTMLInputElement).value);
        }
    };

    private readonly onPlayButtonClick = (_event: Event): void => {
        if (!this._player) return;
        if (this._player.isPlaying) {
            this._player.pause();
        } else {
            this._player.play();
        }
    };

    private readonly onAnimationProcess = (frameTime: number): void => {
        if (!this._slider) return;
        this._slider.value = frameTime.toString();
        if (this._frameDisplayText) this._frameDisplayText.textContent = Math.floor(frameTime).toString();
    };

    private readonly onAnimationStart = (): void => {
        if (!this._playButton) return;
        this._playButton.textContent = "Stop";
    };

    private readonly onAnimationPaused = (): void => {
        if (!this._playButton) return;
        if (this._pausedBySlider) return;
        this._playButton.textContent = "Play";
    };

    private readonly onAnimationEnd = (): void => {
        if (!this._playButton) return;
        this._playButton.textContent = "Play";
    };

    private readonly onAnimationChanged = (animationContainer: IAnimationContainer<unknown>|null): void => {
        if (!this._slider) return;
        if (!animationContainer) {
            this._slider.min = "0";
            this._slider.max = "0";
        } else {
            this._slider.min = animationContainer.startFrame.toString();
            this._slider.max = animationContainer.endFrame.toString();
        }
    };
}

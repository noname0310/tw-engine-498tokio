import { Component } from "the-world-engine";
import { AnimationTrackPlayer } from "./AnimationTrackPlayer";

export class AnimationControl extends Component {
    private _player: AnimationTrackPlayer<unknown>|null = null;
    private _slider: HTMLInputElement|null = null;
    private _playButton: HTMLButtonElement|null = null;
    private _frameDisplayText: HTMLSpanElement|null = null;

    public onDestroy(): void {
        if (this._player) {
            this._player.removeOnAnimationProcessListener(this.onAnimationProcess);
            this._player.removeOnAnimationStartListener(this.onAnimationStart);
            this._player.removeOnAnimationPausedListener(this.onAnimationPaused);
            this._player.removeOnAnimationEndListener(this.onAnimationEnd);
        }

        if (this._slider) {
            this._slider.removeEventListener("input", this.onSliderInput);
        }

        if (this._playButton) {
            this._playButton.removeEventListener("click", this.onPlayButtonClick);
        }

        this._player = null;
        this._slider = null;
        this._playButton = null;
        this._frameDisplayText = null;
    }

    public get player(): AnimationTrackPlayer<unknown>|null {
        return this._player;
    }

    public set player(player: AnimationTrackPlayer<unknown>|null) {
        if (this._player) {
            this._player.removeOnAnimationProcessListener(this.onAnimationProcess);
            this._player.removeOnAnimationStartListener(this.onAnimationStart);
            this._player.removeOnAnimationPausedListener(this.onAnimationPaused);
            this._player.removeOnAnimationEndListener(this.onAnimationEnd);
        }

        this._player = player;
        if (!player) return;

        player.addOnAnimationProcessListener(this.onAnimationProcess);
        player.addOnAnimationStartListener(this.onAnimationStart);
        player.addOnAnimationPausedListener(this.onAnimationPaused);
        player.addOnAnimationEndListener(this.onAnimationEnd);

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
        if (this._player) this._slider.max = this._player.animationTrack?.keys[this._player.animationTrack.keys.length - 1].frame.toString() ?? "0";
        this._slider.addEventListener("input", this.onSliderInput);
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
        this._playButton.textContent = "Play";
    };

    private onAnimationEnd = (): void => {
        if (!this._playButton) return;
        this._playButton.textContent = "Play";
    };
}

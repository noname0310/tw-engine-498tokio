import { Component } from "the-world-engine";
import { AnimationTrackPlayer } from "./AnimationTrackPlayer";

export class AnimationControl extends Component {
    private _player: AnimationTrackPlayer<unknown>|null = null;
    private _slider: HTMLInputElement|null = null;
    private _playButton: HTMLButtonElement|null = null;

    public get player(): AnimationTrackPlayer<unknown>|null {
        return this._player;
    }

    public set player(player: AnimationTrackPlayer<unknown>|null) {
        this._player = player;
        if (!this._player) return;
        if (!this._playButton) return;
        if (this._player.isPlaying) {
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

    private onSliderInput = (event: Event): void => {
        if (!this._player) return;
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this._player.process(value);
    };

    private onPlayButtonClick = (_event: Event): void => {
        if (!this._player) return;
        if (this._player.isPlaying) {
            this._player.stop();
        } else {
            this._player.play();
        }
    };
}
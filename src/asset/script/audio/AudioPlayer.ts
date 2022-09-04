import { Component, EventContainer, IEventContainer } from "the-world-engine";
import { IAnimationClock } from "../IAnimationClock";
import { getFileAudioBuffer } from "./DecodeAudioDataFast";

const enum PlayerState {
    Waiting,
    Playing,
    Paused,
    Stopped,
    Disposed,
}

export class AudioPlayer extends Component implements IAnimationClock {
    private _context: AudioContext|null = null;
    private _source: AudioBufferSourceNode|null = null;
    private _gainNode: GainNode|null = null;

    private _gain = 0;
    private _playbackRate = 1;
    private _pendingPlay = false;
    private _startTime = 0;
    private _jumpedPosition = -1;
    private _state = PlayerState.Waiting;
    
    private readonly _onPlayedEvent = new EventContainer<() => void>();
    private readonly _onPausedEvent = new EventContainer<() => void>();
    private readonly _onStoppedEvent = new EventContainer<() => void>();
    private readonly _onJumpedEvent = new EventContainer<(time: number) => void>();

    private getContext(): AudioContext|null {
        if (this._state === PlayerState.Disposed) return null;
        if (!this._context) {
            this._context = new AudioContext();
            this._context.suspend();
        }
        return this._context;
    }

    private getGainNode(): GainNode|null {
        if (this._state === PlayerState.Disposed) return null;
        const context = this.getContext()!;
        if (!this._gainNode) {
            this._gainNode = context.createGain();
            this._gainNode.gain.value = this._gain;
            this._gainNode.connect(context.destination);
            this._source?.connect(this._gainNode);
        }
        return this._gainNode;
    }

    public onDestroy(): void {
        if (this._source) {
            if (this._state === PlayerState.Playing) {
                this._source.stop();
            }
            this._source.disconnect();
            this._source = null;
        }

        if (this._gainNode) {
            this._gainNode.disconnect();
            this._gainNode = null;
        }

        if (this._context) {
            this._context.close();
            this._context = null;
        }
        this._state = PlayerState.Disposed;
    }

    public onDisable(): void {
        this.pause();
    }

    //#region load methods

    public setAudioFromAudioBuffer(audioBuffer: AudioBuffer): void {
        const context = this.getContext();
        if (!context) return;

        if (this._source) {
            const oldSource = this._source;
            oldSource.onended = null;
            if (this._state === PlayerState.Playing) {
                oldSource.stop();
                context.suspend();
                this._onStoppedEvent.invoke();
                this._state = PlayerState.Waiting;
            }
            oldSource.disconnect();
        }

        const source = this._source = context.createBufferSource();
        source.onended = this.onEnded;
        source.buffer = audioBuffer;
        source.connect(context.destination);
        if (this._gainNode) source.connect(this._gainNode);
        source.playbackRate.value = this._playbackRate;

        if (this._pendingPlay) {
            this._pendingPlay = false;
            this.play();
        }
    }

    public asyncSetAudioFromArrayBuffer(buffer: ArrayBuffer, onComplete?: () => void, onError?: (error: DOMException) => void): void {
        const context = this.getContext();
        if (!context) return;
        getFileAudioBuffer(buffer, context)
            .then(audioBuffer => {
                this.setAudioFromAudioBuffer(audioBuffer);
                onComplete?.();
            })
            .catch(error => {
                if (error instanceof DOMException) {
                    onError?.(error);
                } else {
                    throw error;
                }
            });
        // context.decodeAudioData(buffer,
        //     audioBuffer => {
        //         this.setAudioFromAudioBuffer(audioBuffer);
        //         onComplete?.();
        //     },
        //     error => onError?.(error)
        // );
    }

    public asyncSetAudioFromUrl(url: string, onComplete?: () => void, onError?: (error: DOMException) => void): void {
        const context = this.getContext();
        if (!context) return;
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => this.asyncSetAudioFromArrayBuffer(buffer, onComplete, onError))
            .catch(error => {
                if (error instanceof DOMException) {
                    onError?.(error);
                } else {
                    throw error;
                }
            });
    }

    //#endregion

    public play(): void {
        if (this._state === PlayerState.Disposed) return;
        if (!this.enabled || !this.gameObject.activeInHierarchy) {
            throw new Error("Cannot play audio when audio player is disabled");
        }

        if (!this._source) {
            this._pendingPlay = true;
            return;
        }

        if (this._state === PlayerState.Playing) return;

        if (this._state === PlayerState.Waiting) {
            const context = this.getContext()!;
            const currentTime = context.currentTime;
            if (this._jumpedPosition >= 0) {
                this._startTime = currentTime - this._jumpedPosition / this._playbackRate;
                this._source.start(currentTime, this._jumpedPosition);
                this._jumpedPosition = -1;
            } else {
                this._startTime = currentTime;
                this._source.start(currentTime);
            }
            context.resume();
        } else if (this._state === PlayerState.Paused) {
            if (this._jumpedPosition >= 0) {
                const context = this.getContext()!;
                const newSource = this.refreshSource(context);
                const currentTime = context.currentTime;
                this._startTime = currentTime - this._jumpedPosition / this._playbackRate;
                newSource.start(currentTime, this._jumpedPosition);
                this._jumpedPosition = -1;
                context.resume();
            } else {
                this.getContext()!.resume();
            }
        } else if (this._state === PlayerState.Stopped) {
            const context = this.getContext()!;
            const newSource = this.refreshSource(context);
            const currentTime = context.currentTime;
            if (this._jumpedPosition >= 0) {
                this._startTime = currentTime - this._jumpedPosition / this._playbackRate;
                newSource.start(currentTime, this._jumpedPosition);
                this._jumpedPosition = -1;
            } else {
                this._startTime = currentTime;
                newSource.start(currentTime);
            }
            context.resume();
        }

        this._state = PlayerState.Playing;
        this._onPlayedEvent.invoke();
    }

    public pause(): void {
        if (this._state === PlayerState.Disposed) return;

        if (this._pendingPlay) {
            this._pendingPlay = false;
        }
        
        if (this._state !== PlayerState.Playing) return;
        this.getContext()!.suspend();
        this._state = PlayerState.Paused;
        this._onPausedEvent.invoke();
    }

    public stop(): void {
        if (this._state === PlayerState.Disposed) return;

        if (this._pendingPlay) {
            this._pendingPlay = false;
        }
        
        if (this._state !== PlayerState.Playing) return;
        this.getContext()!.suspend();
        this._state = PlayerState.Stopped;
        this._onStoppedEvent.invoke();
    }

    public setPosition(position: number): void {
        if (this._state === PlayerState.Disposed) return;

        if (this._state === PlayerState.Playing) {
            if (!this._source) return;
            const context = this.getContext()!;
            const newSource = this.refreshSource(context);
            const currentTime = context.currentTime;
            this._startTime = currentTime - position / this._playbackRate;
            newSource.start(currentTime, position);
        } else {
            this._jumpedPosition = position;
            if (!this._source) return;
            const context = this.getContext()!;
            const currentTime = context.currentTime;
            this._startTime = currentTime - position / this._playbackRate;
        }
        this._onJumpedEvent.invoke(position);
    }

    private refreshSource(context: AudioContext): AudioBufferSourceNode {
        const oldSource = this._source!;
        oldSource.onended = null;
        oldSource.stop();
        oldSource.disconnect();
        
        const newSource = context.createBufferSource();
        newSource.onended = this.onEnded;
        newSource.buffer = oldSource.buffer;
        newSource.connect(context.destination);
        if (this._gainNode) newSource.connect(this._gainNode);
        newSource.playbackRate.value = this._playbackRate;
        return this._source = newSource;
    }

    private readonly onEnded = (): void => {
        this.getContext()!.suspend();
        this._state = PlayerState.Stopped;
        this._onStoppedEvent.invoke();
    };
    
    public get currentTime(): number {
        if (!this._source) return 0;
        return (this._source.context.currentTime - this._startTime) * this._playbackRate;
    }

    public get duration(): number {
        if (!this._source) return 0;
        return this._source.buffer!.duration;
    }

    public get isPlaying(): boolean {
        return this._state === PlayerState.Playing;
    }

    public get gain(): number {
        return this._gain;
    }

    public set gain(value: number) {
        this._gain = value;

        const gainNode = this.getGainNode();
        if (!gainNode) return;
        gainNode.gain.value = value;
    }

    public get playbackRate(): number {
        return this._playbackRate;
    }

    public set playbackRate(value: number) {
        if (this._playbackRate === value) return;
        if (value <= 0) throw new Error("Playback rate must be greater than 0");

        const currentTime = this.currentTime;

        if (this._source) {
            this._source.playbackRate.value = value;
            this._playbackRate = value;
            this.setPosition(currentTime);
        } else {
            this._playbackRate = value;
        }
    }

    public get onPlayed(): IEventContainer<() => void> {
        return this._onPlayedEvent;   
    }

    public get onPaused(): IEventContainer<() => void> {
        return this._onPausedEvent;
    }

    public get onStopped(): IEventContainer<() => void> {
        return this._onStoppedEvent;
    }

    public get onJumped(): IEventContainer<(time: number) => void> {
        return this._onJumpedEvent;
    }
}

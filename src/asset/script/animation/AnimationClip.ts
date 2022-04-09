import { AnimationTrack } from "./AnimationTrack";

export class AnimationClip {
    public readonly tracks: AnimationTrack<unknown>[];
    public readonly startFrame: number;
    public readonly endFrame: number;
    private readonly _trackMap: Map<string, number>;

    public constructor(tracks: {name: string, track: AnimationTrack<unknown>}[], startFrame?: number, endFrame?: number) {
        this.tracks = [];
        for (let i = 0; i < tracks.length; i++) {
            this.tracks.push(tracks[i].track);
        }

        this._trackMap = new Map();
        for (let i = 0; i < this.tracks.length; i++) {
            this._trackMap.set(tracks[i].name, i);
        }

        const trackArray = this.tracks;

        if (startFrame) {
            this.startFrame = startFrame;
        } else {
            let minStartFrame = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < trackArray.length; i++) {
                if (trackArray[i].startFrame < minStartFrame) {
                    minStartFrame = trackArray[i].startFrame;
                }
            }
            this.startFrame = minStartFrame;
        }

        if (endFrame) {
            this.endFrame = endFrame;
        } else {
            let maxEndFrame = Number.MIN_SAFE_INTEGER;
            for (let i = 0; i < trackArray.length; i++) {
                if (trackArray[i].endFrame > maxEndFrame) {
                    maxEndFrame = trackArray[i].endFrame;
                }
            }
            this.endFrame = maxEndFrame;
        }
    }

    public getTrackFromName(name: string): AnimationTrack<unknown>|null {
        const index = this._trackMap.get(name);
        if (index === undefined) return null;
        return this.tracks[index];
    }
}

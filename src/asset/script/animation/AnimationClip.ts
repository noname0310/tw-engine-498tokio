import { AnimationClipInstance } from "./AnimationClipInstance";
import { AnimationTrack } from "./AnimationTrack";
import { BindInfo, BindItem } from "./BindInfo";
import { IAnimationContainer } from "./IAnimationContainer";

type TrackItem<T extends string, U> = { name: T, track: AnimationTrack<U> };
export type TrackData = TrackItem<any, any>[];

export type InferedBindData<T extends TrackData> = { 
    [key in keyof T]: T[key] extends TrackItem<infer K, infer V> 
        ? BindItem<K, V>
        : never
};

// type trackA = [{ name: "a", track: AnimationTrack<number>}, { name: "b", track: AnimationTrack<string>}];
// type bindA = [{ trackName: "a", target: (value: number) => void }, { trackName: "b", target: (value: string) => void }];

// type convA = ConvertTrackData<trackA>;
// type defaultInfer = InferedBindData<TrackData>;

export class AnimationClip<T extends TrackData, U extends InferedBindData<T>> implements IAnimationContainer<BindInfo<U>> {
    public readonly tracks: AnimationTrack<unknown>[];
    public readonly startFrame: number;
    public readonly endFrame: number;
    private readonly _trackMap: Map<string, number>;

    public constructor(tracks: [...T], startFrame?: number, endFrame?: number) {
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

    public createInstance(bindInfo: BindInfo<U>): AnimationClipInstance<T, U> {
        return new AnimationClipInstance(this, bindInfo);
    }
}

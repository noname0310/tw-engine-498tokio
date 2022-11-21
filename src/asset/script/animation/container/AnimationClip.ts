import { AnimationClipBindInfo, AnimationClipBindItem } from "../bind/AnimationClipBindInfo";
import { AnimationClipBindResult } from "../bind/AnimationClipBindResult";
import { AnimationClipInstance } from "../instance/AnimationClipInstance";
import { AnimationEventTrack } from "./AnimationEventTrack";
import { AnimationTrack } from "./AnimationTrack";
import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationTrack } from "./IAnimationTrack";

type TrackItem<TrackName extends string, Track extends IAnimationTrack> = { name: TrackName, track: Track };

export type TrackData = TrackItem<any, any>[];

export type InferedAnimationClipBindData<T extends TrackData> = {
    [key in keyof T]: T[key] extends TrackItem<infer TrackName, infer Track>
        ? Track extends AnimationTrack<infer BindType>
            ? AnimationClipBindItem<TrackName, (value: BindType) => void>
            : Track extends AnimationEventTrack<infer _, infer BindData>
                ? AnimationClipBindItem<TrackName, BindData>
                : never
        : never
};

// function inferTestFunction<T extends string, U>(trackitem: TrackItem<T, U>): AnimationEventBindInfo {
//     return {
//         event: () => {},
//         eventRestore: () => {},
//     };
// }

// export const testAnimationEventTrack1 = new AnimationEventTrack([
//     new AnimationEventKey("test1", 0),
// ]);


// inferTestFunction({
//     name: "test",
//     track: new AnimationEventTrack([
//         new AnimationEventKey("test1", 0),
//     ])
// });

// type trackA = [{ name: "a", track: AnimationTrack<number>}, { name: "b", track: AnimationTrack<string>}];
// type trackB = [{ name: "a", track: AnimationTrack<number>}, { name: "b", track: AnimationEventTrack<[AnimationEventKey<"a">, AnimationEventKey<"b">], InferedEventTrackBindData<[AnimationEventKey<"a">, AnimationEventKey<"b">]>>}];
// type bindA = [{ trackName: "a", target: (value: number) => void }, { trackName: "b", target: (value: string) => void }];

// type convA = ConvertTrackData<trackA>;
// type defaultInfer = InferedBindData<TrackData>;

// type inferTest = InferedAnimationClipBindData<[TrackItem<"a", number>]>;

// type eventKey1 = AnimationEventKey<"aa">;
// type trackData1 = [TrackItem<"a", AnimationEventTrack<[eventKey1], { aa: AnimationEventBindInfo }>>];

// type testAnimationEventClip1Type = typeof testAnimationEventClip1;
// type testAnimationEventClip1TypeTrackData = testAnimationEventClip1Type extends AnimationClip<infer T, infer _> ? T : never;
/*
type testAnimationEventClip1TypeTrackData = [{
    name: "position";
    track: AnimationEventTrack<[AnimationEventKey<"test1">, AnimationEventKey<"test2">, AnimationEventKey<"test3">, AnimationEventKey<...>], InferedEventTrackBindData<...>>;
}]
*/

export class AnimationClip<T extends TrackData, U extends InferedAnimationClipBindData<T> = InferedAnimationClipBindData<T>> implements IAnimationContainer<AnimationClipBindInfo<U>, AnimationClipBindResult> {
    public readonly tracks: IAnimationTrack[];
    public readonly trackMap: ReadonlyMap<string, number>;
    public readonly startFrame: number;
    public readonly endFrame: number;
    public readonly frameRate: number;

    public constructor(tracks: [...T], startFrame?: number, endFrame?: number, frameRate = 60) {
        this.tracks = [];
        for (let i = 0; i < tracks.length; i++) {
            this.tracks.push(tracks[i].track);
        }

        const trackMap = new Map();
        for (let i = 0; i < this.tracks.length; i++) {
            trackMap.set(tracks[i].name, i);
        }
        this.trackMap = trackMap;

        const trackArray = this.tracks;

        if (frameRate <= 0) {
            throw new Error("AnimationClip: frameRate must be positive");
        }
        this.frameRate = frameRate;

        if (startFrame) {
            this.startFrame = startFrame;
        } else {
            let minStartFrame = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < trackArray.length; i++) {
                const frameRateRatio = frameRate / trackArray[i].frameRate;
                const scaledStartFrame = trackArray[i].startFrame * frameRateRatio;
                if (scaledStartFrame < minStartFrame) {
                    minStartFrame = scaledStartFrame;
                }
            }
            this.startFrame = minStartFrame;
        }

        if (endFrame) {
            this.endFrame = endFrame;
        } else {
            let maxEndFrame = Number.MIN_SAFE_INTEGER;
            for (let i = 0; i < trackArray.length; i++) {
                const frameRateRatio = frameRate / trackArray[i].frameRate;
                const scaledEndFrame = trackArray[i].endFrame * frameRateRatio;
                if (scaledEndFrame > maxEndFrame) {
                    maxEndFrame = scaledEndFrame;
                }
            }
            this.endFrame = maxEndFrame;
        }
    }

    public getTrackFromName(name: string): IAnimationTrack|null {
        const index = this.trackMap.get(name);
        if (index === undefined) return null;
        return this.tracks[index];
    }

    public createInstance(bindInfo: AnimationClipBindInfo<U>): AnimationClipInstance<T, U> {
        return AnimationClipInstance.create(this, bindInfo);
    }

    public tryCreateInstance(bindInfo: AnimationClipBindInfo<U>): [AnimationClipInstance<T, U>, AnimationClipBindResult] {
        return AnimationClipInstance.tryCreate(this, bindInfo);
    }
}

import { AnimationClipInstance } from "./AnimationClipInstance";
import { AnimationTrack } from "./AnimationTrack";
import { AnimationClipBindInfo, AnimationClipBindItem } from "./AnimationClipBindInfo";
import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationTrack } from "./IAnimationTrack";
import { AnimationEventTrack } from "./AnimationEventTrack";

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

// export type InferedAnimationClipBindData<T extends TrackData> = { 
//     [key in keyof T]: T[key] extends TrackItem<infer TrackName, any>
//         ? T[key]['track'] extends AnimationEventTrack<any, infer BindData>
//             ? AnimationClipBindItem<TrackName, BindData>
//             : T[key]['track'] extends AnimationTrack<infer BindType>
//             ? AnimationClipBindItem<TrackName, (value: BindType) => void>
//             : never
//         : never
// };

// TrackItem에서 Track이 추론되고 있지 않고 있음
// export type TestInfer<T extends TrackData> = {
//     [key in keyof T]: T[key] extends TrackItem<infer TrackName, any>
//         ? T[key]['track'] extends AnimationEventTrack<infer TrackData, infer BindData>
//             ? TrackItem<TrackName, AnimationEventTrack<TrackData, BindData>>
//             : T[key]['track'] extends AnimationTrack<infer BindType>
//                 ? AnimationTrack<BindType>
//                 : never
//         : never
// }

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

export class AnimationClip<T extends TrackData, U extends InferedAnimationClipBindData<T>> implements IAnimationContainer<AnimationClipBindInfo<U>> {
    public readonly tracks: IAnimationTrack[];
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

    public getTrackFromName(name: string): IAnimationTrack|null {
        const index = this._trackMap.get(name);
        if (index === undefined) return null;
        return this.tracks[index];
    }

    public createInstance(bindInfo: AnimationClipBindInfo<U>): AnimationClipInstance<T, U> {
        return new AnimationClipInstance(this, bindInfo);
    }
}

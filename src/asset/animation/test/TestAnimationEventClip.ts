import { Vector3 } from "three/src/Three";
import { AnimationClip } from "../../script/animation/container/AnimationClip";
import { AnimationEventKey } from "../../script/animation/key/AnimationEventKey";
import { AnimationEventTrack } from "../../script/animation/container/AnimationEventTrack";
import { AnimationKey, InterpolationKind } from "../../script/animation/key/AnimationKey";
import { AnimationTrack } from "../../script/animation/container/AnimationTrack";

export const testAnimationEventClip1 = new AnimationClip([
    {
        name: "position" as const, 
        track: new AnimationEventTrack([
            new AnimationEventKey("test1", 0),
            new AnimationEventKey("test2", 100),
            new AnimationEventKey("test3", 200),
            new AnimationEventKey("test4", 300),
        ])
    }
]);

export const testAnimationEventClip2 = new AnimationClip([
    {
        name: "event_track1" as const, 
        track: new AnimationEventTrack([
            new AnimationEventKey("test1", 0),
            new AnimationEventKey("test2", 100),
            new AnimationEventKey("test3", 200),
            new AnimationEventKey("test4", 300),
        ])
    },
    {
        name: "value_track1" as const,
        track: AnimationTrack.createVector3Track([
            new AnimationKey(0, new Vector3(0, 0, 0), InterpolationKind.Linear),
            new AnimationKey(100, new Vector3(1, 0, 0), InterpolationKind.Linear),
            new AnimationKey(200, new Vector3(0, 1, 0), InterpolationKind.Linear),
            new AnimationKey(300, new Vector3(0, 0, 1), InterpolationKind.Linear),
        ])
    },
]);

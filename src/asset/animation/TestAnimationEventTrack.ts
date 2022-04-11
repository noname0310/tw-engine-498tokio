import { AnimationEventKey } from "../script/animation/key/AnimationEventKey";
import { AnimationEventTrack } from "../script/animation/container/AnimationEventTrack";

export const testAnimationEventTrack1 = new AnimationEventTrack([
    new AnimationEventKey("test1", 0),
    new AnimationEventKey("test2", 100),
    new AnimationEventKey("test3", 200),
    new AnimationEventKey("test4", 300),
]);

//container
export { AnimationClip } from "./script/animation/container/AnimationClip";
export type { TrackData, InferedAnimationClipBindData } from "./script/animation/container/AnimationClip";

export { AnimationEventTrack } from "./script/animation/container/AnimationEventTrack";
export type { EventTrackData, InferedEventTrackBindData } from "./script/animation/container/AnimationEventTrack";

export { AnimationSequence, RangedAnimation } from "./script/animation/container/AnimationSequence";
export type { InferedSequenceBindData, ContainerData, SequenceBindItem, NonRecursiveSequenceBindItem, SequenceBindInfo } from "./script/animation/container/AnimationSequence";

export { AnimationTrack } from "./script/animation/container/AnimationTrack";

export type { IAnimationContainer } from "./script/animation/container/IAnimationContainer";

export type { IAnimationTrack } from "./script/animation/container/IAnimationTrack";

//instance
export { AnimationClipInstance } from "./script/animation/instance/AnimationClipInstance";

export { AnimationEventTrackInstance } from "./script/animation/instance/AnimationEventTrackInstance";

export { AnimationSequenceInstance } from "./script/animation/instance/AnimationSequenceInstance";

export { AnimationTrackInstance } from "./script/animation/instance/AnimationTrackInstance";

export type { IAnimationInstance } from "./script/animation/instance/IAniamtionInstance";

export type { IAnimationTrackInstance } from "./script/animation/instance/IAnimationTrackInstance";

//key
export { AnimationEventKey, AnimationEventBindInfo } from "./script/animation/key/AnimationEventKey";

export { InterpolationKind, AnimationKey } from "./script/animation/key/AnimationKey";
export type { IAnimationKey } from "./script/animation/key/IAnimationKey";

//other
export { AnimationClipBindInfo } from "./script/animation/AnimationClipBindInfo";

export type { IAnimationInterpolator } from "./script/animation/AnimationInterpolator";
export { ScalarHermiteInterpolator as ScalarInterpolator, Vector2HermiteInterpolator as Vector2Interpolator, Vector3HermiteInterpolator as Vector3Interpolator, QuaternionHermiteInterpolator as QuaternionInterpolator } from "./script/animation/AnimationInterpolator";

export { AnimationLoopMode } from "./script/animation/AnimationLoopMode";

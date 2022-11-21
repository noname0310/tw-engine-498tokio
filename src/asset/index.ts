//bind
export { AnimationClipBindInfo } from "./script/animation/bind/AnimationClipBindInfo";
export { AnimationClipBindResult } from "./script/animation/bind/AnimationClipBindResult";
export { AnimationSequenceBindResult } from "./script/animation/bind/AnimationSequenceBindResult";
export { BindOk } from "./script/animation/bind/BindOk";
export type { IBindResult } from "./script/animation/bind/IBindResult";

//container
export type { InferedAnimationClipBindData, TrackData } from "./script/animation/container/AnimationClip";
export { AnimationClip } from "./script/animation/container/AnimationClip";
export type { EventTrackData, InferedEventTrackBindData } from "./script/animation/container/AnimationEventTrack";
export { AnimationEventTrack } from "./script/animation/container/AnimationEventTrack";
export type { ContainerData, InferedSequenceBindData, NonRecursiveSequenceBindItem, SequenceBindInfo, SequenceBindItem } from "./script/animation/container/AnimationSequence";
export { AnimationSequence, RangedAnimation } from "./script/animation/container/AnimationSequence";
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
export { AnimationEventBindInfo, AnimationEventKey } from "./script/animation/key/AnimationEventKey";
export { AnimationKey, InterpolationKind } from "./script/animation/key/AnimationKey";
export type { IAnimationKey } from "./script/animation/key/IAnimationKey";

//other

export type { IAnimationInterpolator } from "./script/animation/AnimationInterpolator";
export { QuaternionHermiteInterpolator as QuaternionInterpolator, ScalarHermiteInterpolator as ScalarInterpolator, Vector2HermiteInterpolator as Vector2Interpolator, Vector3HermiteInterpolator as Vector3Interpolator } from "./script/animation/AnimationInterpolator";
export { AnimationLoopMode } from "./script/animation/AnimationLoopMode";

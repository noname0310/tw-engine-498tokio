import { IAnimationInstance } from "./IAniamtionInstance";
import { IAnimationTrack } from "./IAnimationTrack";

export interface IAnimationTrackInstance extends IAnimationInstance {
    new(animationTrack: IAnimationTrack, ...args: any[]): IAnimationTrackInstance;
}

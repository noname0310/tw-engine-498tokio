import { IAnimationTrack } from "../container/IAnimationTrack";
import { IAnimationInstance } from "./IAniamtionInstance";

export interface IAnimationTrackInstance extends IAnimationInstance {
    new(animationTrack: IAnimationTrack, ...args: any[]): IAnimationTrackInstance;
}

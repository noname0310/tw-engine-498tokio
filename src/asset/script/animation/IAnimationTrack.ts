import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationKey } from "./IAnimationKey";

export interface IAnimationTrack extends IAnimationContainer<unknown> {
    get keys(): readonly IAnimationKey[];
}

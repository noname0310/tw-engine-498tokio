import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationKey } from "../key/IAnimationKey";

export interface IAnimationTrack extends IAnimationContainer<unknown> {
    get keys(): readonly IAnimationKey[];
}

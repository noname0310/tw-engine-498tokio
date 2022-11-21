import { IAnimationKey } from "../key/IAnimationKey";
import { IAnimationContainer } from "./IAnimationContainer";

export interface IAnimationTrack extends IAnimationContainer<unknown> {
    get keys(): readonly IAnimationKey[];
}

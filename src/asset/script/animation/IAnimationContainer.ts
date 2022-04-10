import { IAnimationInstance } from "./IAniamtionInstance";

export interface IAnimationContainer<T> {
    get startFrame(): number;
    get endFrame(): number;
    createInstance(bind: T): IAnimationInstance;
}

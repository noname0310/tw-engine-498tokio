import { IAnimationInstance } from "../instance/IAniamtionInstance";

export interface IAnimationContainer<T> {
    get startFrame(): number;
    get endFrame(): number;
    get frameRate(): number;
    createInstance(bind: T): IAnimationInstance;
}

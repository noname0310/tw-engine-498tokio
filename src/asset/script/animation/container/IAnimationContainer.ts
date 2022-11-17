import { IBindResult } from "../bind/IBindResult";
import { IAnimationInstance } from "../instance/IAniamtionInstance";

export interface IAnimationContainer<BindInfo, BindResult extends IBindResult = IBindResult> {
    get startFrame(): number;
    get endFrame(): number;
    get frameRate(): number;
    createInstance(bind: BindInfo): IAnimationInstance;
    tryCreateInstance(bind: BindInfo): [IAnimationInstance, BindResult];
}

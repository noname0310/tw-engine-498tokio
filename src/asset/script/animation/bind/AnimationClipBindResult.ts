import { IBindResult } from "./IBindResult";

export class AnimationClipBindResult implements IBindResult {
    public bindFailTrackNames: readonly string[];

    public constructor(bindFailTrackNames: readonly string[]) {
        this.bindFailTrackNames = bindFailTrackNames;
    }

    public get isBindSuccess(): boolean {
        return this.bindFailTrackNames.length === 0;
    }
}

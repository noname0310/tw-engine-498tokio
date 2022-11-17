import { IBindResult } from "./IBindResult";

export class AnimationSequenceBindResult implements IBindResult {
    public bindResults: readonly IBindResult[];
    public isBindSuccess: boolean;

    public constructor(bindResults: readonly IBindResult[]) {
        let isBindSuccess = true;
        for (let i = 0; i < bindResults.length; i++) {
            if (!bindResults[i].isBindSuccess) {
                isBindSuccess = false;
                break;
            }
        }
        this.bindResults = bindResults;
        this.isBindSuccess = isBindSuccess;
    }
}

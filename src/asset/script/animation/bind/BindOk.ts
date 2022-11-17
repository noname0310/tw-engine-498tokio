import { IBindResult } from "./IBindResult";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BindOk = new class BindOk implements IBindResult {
    public readonly isBindSuccess = true;
};

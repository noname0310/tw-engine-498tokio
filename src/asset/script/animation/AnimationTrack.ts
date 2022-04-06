import { AnimationKey } from "./AnimationKey";

export class AnimationTrack<T> {
    /**
     * this member must be sorted by frame member
     */
    private _keys: AnimationKey<T>[];

    public constructor(keys: AnimationKey<T>[]) {
        this._keys = keys;
    }

    public get keys(): readonly AnimationKey<T>[] {
        return this._keys;
    }
}

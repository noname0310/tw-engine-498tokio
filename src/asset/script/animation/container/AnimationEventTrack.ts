import { BindOk } from "../bind/BindOk";
import { AnimationEventTrackInstance } from "../instance/AnimationEventTrackInstance";
import { AnimationEventBindInfo, AnimationEventKey } from "../key/AnimationEventKey";
import { IAnimationContainer } from "./IAnimationContainer";
import { IAnimationTrack } from "./IAnimationTrack";

type DeDuplicate<Arr extends any[], E = never> =
    Arr extends [infer A, ...infer ArrRest]
        ? A extends E
            ? DeDuplicate<ArrRest, E>
            :[A, ...DeDuplicate<ArrRest, E|A>]
        :[];

type ListAsMap<Arr extends any[], V> = {
    [key in Arr[number]]: V
};

// type list1 = [1, 1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10];
// type deDuplicateList1 = DeDuplicate<list1>;

export type EventTrackData = AnimationEventKey<any>[];

export type InferedEventTrackBindData<T extends EventTrackData> = ListAsMap<DeDuplicate<{
    [key in keyof T]: T[key] extends AnimationEventKey<infer U>
        ? U
        : never
}>, AnimationEventBindInfo>;

type ArrayReadonly<T extends any[]> = readonly [...T];

// type testArray = [1, 1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10];
// type testArrayReadonly = ArrayReadonly<testArray>;

// type trackData1 = [
//     AnimationEventKey<"a">,
//     AnimationEventKey<"b">,
//     AnimationEventKey<"a">,
// ];

// type inferTest = InferedEventTrackBindData<trackData1>;

// type inferTest2 = InferedEventTrackBindData<[AnimationEventKey<"test1">]>;

// type inferTest3 = InferedEventTrackBindData<[AnimationEventKey<"test1">, AnimationEventKey<"test2">, AnimationEventKey<"test3">, AnimationEventKey<"test4">]>;

export class AnimationEventTrack<T extends EventTrackData, U extends InferedEventTrackBindData<T> = InferedEventTrackBindData<T>> implements IAnimationContainer<U>, IAnimationTrack {
    /**
     * this member must be sorted by frame member
     */
    private readonly _keys: T;

    public constructor(keys: [...T], frameRate = 60) {
        AnimationEventTrack.validateKeys(keys);
        this._keys = keys.slice() as T;

        if (frameRate <= 0) {
            throw new Error("AnimationEventTrack: frameRate must be positive");
        }
        this.frameRate = frameRate;
    }

    private static validateKeys<T extends string>(keys: AnimationEventKey<T>[]): void {
        let previousFrame = 0;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].frame < previousFrame) {
                throw new Error("AnimationEventTrack: keys must be sorted by frame");
            }
            if (keys[i].frame < 0) {
                throw new Error("AnimationEventTrack: keys must be positive");
            }
            previousFrame = keys[i].frame;
        }
    }

    public get keys(): ArrayReadonly<T> {
        return this._keys;
    }

    public get startFrame(): number {
        return this._keys[0].frame;
    }

    public get endFrame(): number {
        return this._keys[this._keys.length - 1].frame;
    }

    public readonly frameRate: number;

    public createInstance(bindInfo: U): AnimationEventTrackInstance<T, U> {
        return new AnimationEventTrackInstance(this, bindInfo);
    }

    public tryCreateInstance(bindInfo: U): [AnimationEventTrackInstance<T, U>, typeof BindOk] {
        return [new AnimationEventTrackInstance(this, bindInfo), BindOk];
    }
}

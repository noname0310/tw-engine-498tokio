export type AnimationClipBindItem<T extends string, U> = { trackName: T, target: U };
export type AnimationClipBindData = AnimationClipBindItem<string, any>[];

export class AnimationClipBindInfo<T extends AnimationClipBindData> {
    public readonly data: [...T];

    public constructor(data: [...T]) {
        this.data = [] as any;
        for (let i = 0; i < data.length; i++) {
            this.data.push({...data[i]});
        }
    }
}

// new BindInfo([
//     { trackName: "position", target: (value: Vector3) => { } },
//     { trackName: "rotation", target: (value: Quaternion) => { } },
// ])

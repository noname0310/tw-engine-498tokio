export type BindItem<T extends string, U> = { trackName: T, target: (value: U) => void };
export type BindData = BindItem<any, any>[];

export class BindInfo<T extends BindData> {
    public readonly data: [...T];

    public constructor(data: [...T]) {
        this.data = [] as any;
        for (let i = 0; i < data.length; i++) {
            this.data.push({ trackName: data[i].trackName, target: data[i].target });
        }
    }
}

// new BindInfo([
//     { trackName: "position", target: (value: Vector3) => { } },
//     { trackName: "rotation", target: (value: Quaternion) => { } },
// ])

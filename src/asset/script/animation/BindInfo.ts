export class BindInfo {
    public readonly data: { trackName: string, target: (value: unknown) => void }[];

    public constructor(data: { trackName: string, target: (value: unknown) => void }[]) {
        this.data = [];
        for (let i = 0; i < data.length; i++) {
            this.data.push({ trackName: data[i].trackName, target: data[i].target });
        }
    }
}

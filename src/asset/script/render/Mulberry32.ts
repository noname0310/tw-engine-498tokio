export class Mulberry32 {
    private _a: number;

    public constructor(seed: number) {
        this._a = seed;
    }

    public next() {
        let t = this._a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

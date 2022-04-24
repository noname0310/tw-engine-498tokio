class NumberStringPoolInternal {
    private readonly _pool: Map<number, string> = new Map();

    public get(value: number): string {
        if (this._pool.has(value)) {
            return this._pool.get(value)!;
        } else {
            const result = value.toString();
            this._pool.set(value, result);
            return result;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NumberStringPool = new NumberStringPoolInternal();

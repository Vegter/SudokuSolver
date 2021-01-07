import assert from "assert"

export function range(from: number, to: number | null = null): number[] {
    if (to === null) {
        to = from
        from = 0
    }
    assert(to >= from)
    return Array.from(Array(to - from).keys()).map(v => from + v)
}

export const getAllSubsets =
    (theArray: any[]) => theArray.reduce(
        (subsets, value) => subsets.concat(
            subsets.map((set: any) => [value,...set])
        ),
        [[]]
    );

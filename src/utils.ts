import assert from "assert"

export function range(from: number, to: number | null = null): number[] {
    if (to === null) {
        to = from
        from = 0
    }
    assert(to >= from)
    return Array.from(Array(to - from).keys()).map(v => from + v)
}

export function getAllSubsets<T>(theArray: T[]): T[][] {
    const result = theArray.reduce(
        (subsets: T[][], value: T) => subsets.concat(
            subsets.map((set: T[]) => [...set, value])
        ),
        [[]] as T[][]
    );
    result.sort((s1: any[], s2: any[]) => s2.length - s1.length)
    return result
}

interface PairSearchResult {
    [key: string]: {
        pair: any[],
        presences: Set<number>
    }
}

function pairId<T>(pair: T[]): string {
    return pair.join(".")
}

export function getPairs<T>(theArray: T[][]) {
    // [ [x, y], [n, m], [x, y] ] => [ [x, y], [0, 2] ]
    const ids = theArray.map(i => pairId(i))
    const result: PairSearchResult = {}
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        for (let j = i + 1; j < ids.length; j++) {
            if (ids[j] === id) {
                result[id] = result[id] || {
                    pair: theArray[i],
                    presences: new Set([i])
                }
                result[id].presences.add(j)
            }
        }
    }
    return Object.values(result).map(v => [v.pair, Array.from(v.presences)])
}

export function getHiddenPairs<T>(theArray: T[][]) {
    // [ [t, v, x, z], [n, m], [u, v, w, x, y, z] ] => [ [v, x, z], [0, 2] ]

    const result: PairSearchResult = {}
    for (let i = 0; i < theArray.length; i++) {
        for (let iSubset of getAllSubsets(theArray[i]).filter((s: T[]) => s.length > 1)) {
            const isIncluded = [i]
            let isHiddenPair = true
            for (let j = 0; j < theArray.length && isHiddenPair; j++) {
                // Does theArray[j] include all items of the subset?
                if (j === i) continue
                const includes = iSubset.filter(item => theArray[j].includes(item))
                if (includes.length === iSubset.length) {
                    isIncluded.push(j)
                } else if (includes.length > 0) {
                    isHiddenPair = false
                }
            }
            if (isHiddenPair && isIncluded.length > 1) {
                result[pairId(iSubset)] = result[pairId(iSubset)] || {
                    pair: iSubset,
                    presences: new Set()
                }
                isIncluded.forEach(i => result[pairId(iSubset)].presences.add(i))
                break
            }
        }
    }
    return Object.values(result).map(v => [v.pair, Array.from(v.presences)])
}

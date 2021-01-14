import { getAllSubsets, getHiddenPairs, getPairs, range } from "./utils"
import { AssertionError } from "assert"

test('create ranges', () => {
    // Create range [n, m>
    let r = range(0, 5)
    expect(r).toEqual([0, 1, 2, 3, 4])
    r = range(1, 5)
    expect(r).toEqual([1, 2, 3, 4])
    r = range(1, 1)
    expect(r).toEqual([])
    r = range(1, 11)
    expect(r).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    // Create range [0, n>
    r = range(0)
    expect(r).toEqual([])
    r = range(5)
    expect(r).toEqual([0, 1, 2, 3, 4])
    r = range(10)
    expect(r).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    // Assert valid range, i.e. range [n, m> requires m >= n
    expect(() => {
        // [1, 0>
        r = range(1, 0)
    }).toThrow(AssertionError)
    expect(() => {
        // [0, -1>
        r = range(-1)
    }).toThrow(AssertionError)
});

test("find subsets", () => {
    expect(getAllSubsets([1, 2, 3]).length).toEqual(8)
    expect(getAllSubsets([1, 2, 3])).toEqual([
        [ 1, 2, 3 ],
        [ 1, 2 ],  [ 1, 3 ], [ 2, 3 ],
        [ 1 ], [ 2 ], [ 3 ],
        [],
    ])
})

test("find pairs", () => {
    expect(getPairs([])).toEqual([])
    expect(getPairs([[1, 2], [3, 4], [1, 2]])).toEqual([[[1, 2], [0, 2]]])
    expect(getPairs([[1, 2], [3, 4], [1, 2, 3]])).toEqual([])
    expect(getPairs([[1, 2], [3, 4], [1, 2], [1, 2, 3]])).toEqual([[[1, 2], [0, 2]]])
    expect(getPairs([[1, 2], [3, 4], [1, 2], [1, 2, 3], [1, 2]])).toEqual([[[1, 2], [0, 2, 4]]])
})

test("find hidden pairs", () => {
    expect(getHiddenPairs([])).toEqual([])
    expect(getHiddenPairs([[1, 2], [3, 4], [1, 2]])).toEqual([[[1, 2], [0, 2]]])
    expect(getHiddenPairs([[1, 2], [3, 4], [1, 2, 3]])).toEqual([[[1, 2], [0, 2]]])
    expect(getHiddenPairs([[1, 2], [3, 4], [1, 2], [1, 2, 3, 4, 5]])).toEqual([
        [[1, 2], [0, 2, 3]],
        [[3, 4], [1, 3]]
    ])
    expect(getHiddenPairs([[1, 3, 5, 7], [3, 4], [2, 3, 4, 5, 6, 7]])).toEqual([
        [[5, 7], [0, 2]]
    ])
    expect(getHiddenPairs([[1, 2, 3, 4], [3, 4], [1, 2, 3], [1, 2, 3, 5]])).toEqual([
        [[1, 2], [0, 2, 3]]
    ])
})

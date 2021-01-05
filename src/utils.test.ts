import { range } from "./utils"
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

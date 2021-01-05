import { SudokuFactory } from "./SudokuFactory"
import { SudokuHelper } from "./SudokuHelper"

test("create helper", () => {
    const s = SudokuFactory.createNRCSudoku();
    [
        [1, 0, 2],
        [1, 3, 4],
        [1, 4, 6],
        [1, 8, 5],
        [2, 8, 9],
        [3, 1, 1],
        [3, 5, 7],
        [5, 1, 9],
        [5, 5, 2],
        [5, 6, 5],
        [6, 2, 3],
        [7, 3, 6],
        [7, 5, 1],
        [7, 6, 4],
        [8, 3, 8]
    ].forEach(([row, col, value]) =>
        s.setValue({row, col}, value));
    const h = new SudokuHelper(s)
    h.analyze()

    let index = {row: 4, col: 5}
    expect(h.allowedValues(index)).toEqual([3, 4, 5, 6, 8, 9])
    expect(h.mandatoryValue(index)).toEqual(6)
})

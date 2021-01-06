import { SudokuFactory } from "./SudokuFactory"
import { SudokuHelper } from "./SudokuHelper"

function getSudoku() {
    const sudoku = SudokuFactory.createNRCSudoku();
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
        sudoku.setValue({row, col}, value));
    return sudoku
}

test("create helper", () => {
    const s = getSudoku()
    const h = new SudokuHelper(s)
    h.analyze()

    let index = {row: 4, col: 5}
    expect(h.allowedValues(index)).toEqual([3, 4, 5, 6, 8, 9])
    expect(h.mandatoryValue(index)).toEqual(6)
})

test("get hint", () => {
    let s = getSudoku()
    let h = new SudokuHelper(s)
    h.analyze()
    expect(h.getHint()).toEqual([{row: 2, col: 5}, 5])

    let hint = h.getHint()
    while (hint) {
        const [index, value] = hint
        s.setValue(index, value)
        h.analyze()
        hint = h.getHint()
    }
    let emptyCells = s.indexes.map(index => s.getValue(index)).filter(v => v === null)
    expect(emptyCells.length).toEqual(0)
    h.analyze()

    s = SudokuFactory.createNRCSudoku();
    h = new SudokuHelper(s)
    h.analyze()
    expect(h.getHint()).toEqual(undefined)
})

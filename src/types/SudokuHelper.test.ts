import { SudokuFactory } from "./SudokuFactory"
import { SudokuHelper } from "./SudokuHelper"
import { Sudoku } from "./Sudoku"
import { ImportDataItem } from "./SudokuImport"

function fillSudoku(sudoku: Sudoku, data: ImportDataItem[]) {
    data.forEach(([row, col, value]) =>
        sudoku.setValue({row, col}, value));
}

function getSudoku() {
    const sudoku = SudokuFactory.createNRCSudoku();
    const data: ImportDataItem[] = [
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
    ]
    fillSudoku(sudoku, data)
    return sudoku
}

test("create helper", () => {
    const s = getSudoku()
    const h = new SudokuHelper(s)
    h.analyze()

    let index = {row: 4, col: 5}
    expect(h.allowedValues(index)).toEqual([3, 4, 5, 6, 8, 9])
    expect(h.mandatoryValue(index)).toEqual(6)
    expect(h.pairs(index)).toEqual([])
    expect(h.singleRowColumnValues(index)).toEqual([6])
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

test("mandatory values", () => {
    const sudoku = SudokuFactory.createBasicSudoku();
    const data: ImportDataItem[] = [
        [0, 3, 1],
        [0, 5, 4],
        [1, 2, 1],
        [1, 6, 9],
        [2, 1, 9],
        [2, 3, 7],
        [2, 5, 3],
        [2, 7, 6],
        [3, 0, 8],
        [3, 2, 7],
        [3, 6, 1],
        [3, 8, 6],
        [5, 0, 3],
        [5, 2, 4],
        [5, 6, 5],
        [5, 8, 9],
        [6, 1, 5],
        [6, 3, 4],
        [6, 5, 2],
        [6, 7, 3],
        [7, 2, 8],
        [7, 6, 6],
        [8, 3, 8],
        [8, 5, 6],
    ]
    SudokuFactory.fillData(sudoku, data)
    const helper = new SudokuHelper(sudoku)
    helper.analyze()
    const singleValueIndexes = sudoku.indexes
        .filter(index => helper.mandatoryValue(index) !== null && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, helper.mandatoryValue(index)])
    expect(singleValueIndexes).toEqual([
        [0, 4, 9],
        [2, 8, 1],
        [3, 1, 2]
    ])
})

test("single row/columns", () => {
    const sudoku = SudokuFactory.createBasicSudoku();
    const data: ImportDataItem[] = [
        [0, 2, 9],
        [0, 3, 2],
        [0, 5, 3],
        [0, 6, 8],
        [1, 5, 9],
        [2, 0, 4],
        [2, 2, 8],
        [2, 3, 6],
        [2, 5, 5],
        [2, 6, 1],
        [2, 8, 3],
        [3, 0, 1],
        [3, 2, 2],
        [3, 6, 9],
        [3, 8, 4],
        [5, 0, 8],
        [5, 2, 3],
        [5, 6, 5],
        [5, 8, 2],
        [6, 0, 9],
        [6, 2, 6],
        [6, 3, 5],
        [6, 5, 2],
        [6, 6, 3],
        [6, 8, 7],
        [7, 2, 1],
        [8, 2, 5],
        [8, 3, 4],
        [8, 5, 8],
        [8, 6, 6],
    ]
    SudokuFactory.fillData(sudoku, data)
    const helper = new SudokuHelper(sudoku)
    helper.analyze()
    const singleRowColumnValues = sudoku.indexes
        .filter(index => helper.singleRowColumnValues(index).length && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, helper.singleRowColumnValues(index)])
    expect(singleRowColumnValues).toEqual([
        [ 0, 1, [ 1 ] ],
        [ 0, 4, [ 4 ] ],
        [ 1, 0, [ 3 ] ],
        [ 1, 1, [ 1, 3 ] ],
        [ 1, 3, [ 8 ] ],
        [ 1, 4, [ 4, 8 ] ],
        [ 2, 7, [ 9 ] ],
        [ 3, 4, [ 5 ] ],
        [ 3, 7, [ 3 ] ],
        [ 4, 1, [ 9 ] ],
        [ 4, 4, [ 2, 5 ] ],
        [ 4, 7, [ 3 ] ],
        [ 5, 1, [ 9 ] ],
        [ 6, 1, [ 4, 8 ] ],
        [ 6, 4, [ 1 ] ],        // Implies 1 in [1, 3]
        [ 7, 1, [ 4, 8 ] ],
        [ 7, 4, [ 6 ] ],
        [ 7, 5, [ 6 ] ],
        [ 7, 7, [ 5 ] ],
        [ 7, 8, [ 5 ] ],
        [ 8, 4, [ 1 ] ]         // Implies 1 in [1, 3]
    ])
})

test("missing numbers", () => {
    const sudoku = SudokuFactory.createBasicSudoku();
    const data: ImportDataItem[] = [
        [0, 2, 3],
        [0, 6, 1],
        [1, 1, 5],
        [1, 7, 6],
        [2, 0, 4],
        [2, 3, 5],
        [2, 5, 3],
        [2, 8, 9],
        [3, 2, 9],
        [3, 4, 3],
        [3, 6, 2],
        [4, 3, 1],
        [4, 5, 6],
        [5, 0, 5],
        [5, 2, 8],
        [5, 3, 4],
        [5, 4, 2],
        [5, 5, 9],
        [5, 6, 3],
        [5, 8, 1],
        [6, 0, 3],
        [6, 3, 7],
        [6, 5, 4],
        [6, 8, 5],
        [7, 1, 4],
        [7, 7, 1],
        [8, 2, 1],
        [8, 6, 9],
    ]
    SudokuFactory.fillData(sudoku, data)
    const helper = new SudokuHelper(sudoku)
    helper.analyze()
    const singleValueIndexes = sudoku.indexes
        .filter(index => helper.mandatoryValue(index) !== null && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, helper.mandatoryValue(index)])
    expect(singleValueIndexes).toEqual([
        [ 0, 7, 5 ], [ 1, 5, 1 ],
        [ 1, 8, 3 ], [ 3, 3, 8 ],
        [ 3, 8, 6 ], [ 4, 1, 3 ],
        [ 4, 2, 4 ], [ 4, 6, 5 ],
        [ 4, 7, 9 ], [ 5, 1, 6 ],   // 5, 1 should be 6
        [ 5, 7, 7 ], [ 6, 4, 1 ],
        [ 7, 2, 5 ], [ 8, 7, 3 ]
    ])
})

test("pairs", () => {
    const sudoku = SudokuFactory.createBasicSudoku();
    const data: ImportDataItem[] = [
        [0, 0, 4],
        [0, 3, 8],
        [0, 5, 9],
        [0, 6, 1],
        [1, 2, 7],
        [1, 7, 9],
        [2, 0, 9],
        [2, 1, 5],
        [2, 4, 2],
        [2, 8, 7],
        [3, 0, 1],
        [3, 4, 9],
        [3, 8, 3],
        [4, 0, 3],
        [4, 1, 9],
        [4, 2, 2],
        [4, 3, 4],
        [4, 5, 7],
        [4, 6, 8],
        [5, 0, 6],
        [5, 4, 3],
        [5, 8, 9],
        [6, 0, 7],
        [6, 1, 2],
        [6, 4, 8],
        [6, 7, 6],
        [7, 1, 1],
        [7, 6, 2],
        [8, 2, 3],
        [8, 3, 1],
        [8, 5, 2],
        [8, 8, 4],
    ]
    SudokuFactory.fillData(sudoku, data)
    const helper = new SudokuHelper(sudoku)
    helper.analyze()
    const pairIndexes = sudoku.indexes
        .filter(index => helper.pairs(index).length)
        .map(index => [index.row, index.col, helper.pairs(index).map(({row, col}) => `${row}, ${col}`)])
    expect(pairIndexes).toEqual([
        [ 7, 0, [ '7, 0', '7, 8', '8, 0' ] ],
        [ 7, 8, [ '7, 0', '7, 8' ] ],
        [ 8, 0, [ '7, 0', '8, 0' ] ]
    ])

    const hiddenPairIndexes = sudoku.indexes
        .filter(index => helper.hiddenPairs(index).length)
        .map(index => [index.row, index.col])
    expect(hiddenPairIndexes).toEqual([
        [ 3, 1 ],
        [ 5, 1 ],
        [ 6, 2 ],
        [ 7, 2 ]
    ])
})

test("hidden pairs", () => {
    const sudoku = SudokuFactory.createBasicSudoku();
    const data: ImportDataItem[] = [
        [0, 0, 4],
        [0, 3, 3],
        [0, 4, 1],
        [0, 5, 9],
        [0, 8, 6],
        [1, 2, 1],
        [1, 6, 9],
        [2, 1, 6],
        [2, 2, 7],
        [2, 3, 4],
        [2, 7, 2],
        [2, 8, 1],
        [3, 0, 7],
        [3, 4, 5],
        [3, 8, 4],
        [4, 3, 1],
        [4, 4, 4],
        [4, 5, 2],
        [5, 0, 2],
        [5, 4, 7],
        [5, 8, 8],
        [6, 1, 2],
        [6, 7, 6],
        [7, 2, 4],
        [7, 6, 8],
        [8, 0, 1],
        [8, 3, 5],
        [8, 5, 8],
        [8, 8, 7],
    ]
    SudokuFactory.fillData(sudoku, data)
    const helper = new SudokuHelper(sudoku)
    helper.analyze()

    const pairIndexes = sudoku.indexes
        .filter(index => helper.pairs(index).length)
        .map(index => [index.row, index.col, helper.pairs(index).map(({row, col}) => `${row}, ${col}`)])
    expect(pairIndexes).toEqual([
        [ 1, 8, [ '1, 8', '2, 6' ] ],
        [ 2, 6, [ '1, 8', '2, 6' ] ],
        [ 3, 5, [ '3, 5', '5, 5' ] ],
        [ 5, 5, [ '3, 5', '5, 5' ] ]
    ])

    const hiddenPairIndexes = sudoku.indexes
        .filter(index => helper.hiddenPairs(index).length)
        .map(index => [index.row, index.col])
    // 1 4 is an hidden pair for 6, 5 and 6, 6
    expect(hiddenPairIndexes).toEqual([
        [ 6, 5 ],
        [ 6, 6 ]
    ])
})
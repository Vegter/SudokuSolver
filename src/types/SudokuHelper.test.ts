import { SudokuFactory } from "./SudokuFactory"
import { SudokuHelper } from "./SudokuHelper"
import { Sudoku, SudokuIndex } from "./Sudoku"
import { ImportDataItem } from "./SudokuImport"

function fillSudoku(sudoku: Sudoku, data: ImportDataItem[]) {
    data.forEach(([row, col, value]) =>
        sudoku.setValue(new SudokuIndex(row, col), value));
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
    const strategies = h.strategies

    let index = new SudokuIndex(4, 5)
    expect(h.allowedValues(index)).toEqual([3, 4, 5, 6, 8, 9])
    expect(strategies.MandatoryValue.values(index)).toEqual([6])
    expect(strategies.SingleRowColumn.values(index)).toEqual([6])
    expect(strategies.NakedPair.values(index)).toEqual([])
    expect(strategies.HiddenPair.values(index)).toEqual([])
})

test("get hint", () => {
    let s = getSudoku()
    let h = new SudokuHelper(s)

    let hint = h.getHint()
    expect(hint).toEqual([new SudokuIndex(5, 3), 1])
    h.applyHint(hint!)

    hint = h.getHint()
    expect(hint).toEqual([new SudokuIndex(6, 5), 9])
    h.applyHint(hint!)

    hint = h.getHint()
    while (hint) {
        h.applyHint(hint)
        hint = h.getHint()
    }
    let emptyCells = s.indexes.map(index => s.getValue(index)).filter(v => v === null)
    expect(emptyCells.length).toEqual(0)

    s = SudokuFactory.createNRCSudoku();    // Empty Sudoku should not have any solutions
    h = new SudokuHelper(s)
    expect(h.getHint()).toEqual(undefined)
})

test("mandatory values", () => {
    // Standard Sudoku - Scanning
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
    const strategies = helper.strategies
    const strategy = strategies.MandatoryValue

    const singleValueIndexes = sudoku.indexes
        .filter(index => strategy.values(index).length > 0 && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, strategies.MandatoryValue.values(index)])
    expect(singleValueIndexes).toEqual([
        [0, 4, [9]],
        [2, 8, [1]],
        // [3, 1, [2]]  is not mandatory but only value possible
    ])
})

test("single row/columns", () => {
    // Standard Sudoku - Singles
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
    const strategies = helper.strategies
    const strategy = strategies.SingleRowColumn

    const singleRowColumnValues = sudoku.indexes
        .filter(index => strategy.values(index).length && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, strategy.values(index)])
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
    // Standard Sudoku - Missings
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
    const strategies = helper.strategies
    const strategy = strategies.MandatoryValue

    const singleValueIndexes = sudoku.indexes
        .filter(index => strategy.values(index).length > 0 && sudoku.getValue(index) === null)
        .map(index => [index.row, index.col, strategy.values(index)])
    expect(singleValueIndexes).toEqual([
        [ 0, 7, [5] ],
        [ 1, 5, [1] ],
        [ 1, 8, [3] ],
        [ 3, 8, [6] ],
        [ 4, 1, [3] ],
        [ 4, 2, [4] ],
        [ 4, 6, [5] ],
        [ 4, 7, [9] ],
        [ 5, 1, [6] ],   // 5, 1 should be 6
        [ 6, 4, [1] ],
        [ 7, 2, [5] ],
        [ 8, 7, [3] ]
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
    const strategies = helper.strategies
    const nakedPair = strategies.NakedPair

    const pairIndexes = sudoku.indexes
        .filter(index => nakedPair.values(index).length)
        .map(index => [index.row, index.col, nakedPair.values(index)])
    expect(pairIndexes).toEqual([
        [ 7, 0, [ 5, 8 ] ],
        [ 7, 8, [ 5, 8 ] ],
        [ 8, 0, [ 5, 8 ] ]
    ])

    const hiddenPair = strategies.HiddenPair
    const hiddenPairIndexes = sudoku.indexes
        .filter(index => hiddenPair.values(index).length)
        .map(index => [index.row, index.col, hiddenPair.values(index)])
    expect(hiddenPairIndexes).toEqual([
        [ 3, 1, [4, 7] ],
        [ 5, 1, [4, 7] ],
        [ 6, 2, [4, 9] ],
        [ 7, 2, [4, 9] ]
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
    const nakedPair = helper.strategies.NakedPair

    const pairIndexes = sudoku.indexes
        .filter(index => nakedPair.values(index).length)
        .map(index => [index.row, index.col, nakedPair.values(index)])
    expect(pairIndexes).toEqual([
        [ 1, 8, [ 3, 5 ] ],
        [ 2, 6, [ 3, 5 ] ],
        [ 3, 5, [ 3, 6 ] ],
        [ 5, 5, [ 3, 6 ] ]
    ])

    const hiddenPair = helper.strategies.HiddenPair
    const hiddenPairIndexes = sudoku.indexes
        .filter(index => hiddenPair.values(index).length)
        .map(index => [index.row, index.col, hiddenPair.values(index)])

    // 1 4 is an hidden pair for 6, 5 and 6, 6
    expect(hiddenPairIndexes).toEqual([
        [ 6, 5, [ 1, 4 ] ],
        [ 6, 6, [ 1, 4 ] ],
    ])
})
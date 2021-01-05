import { SudokuAreaConstraint, SudokuColumnConstraint, SudokuRowConstraint } from "./SudokuConstraint"
import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuValue } from "./SudokuValue"

test("create row constraints", () => {
    const row = 0
    let c = new SudokuRowConstraint(row)

    let s = new Sudoku(3, 3, [c])

    s.colIndexes.forEach(col => expect(c.appliesTo({ row: 0, col})).toEqual(true))
    s.rowIndexes.filter(row => row !== 0).forEach(row => {
        s.colIndexes.forEach(col => expect(c.appliesTo({ row, col})).toEqual(false))
    })

    expect(c.blockedValues(s,{row, col: 0})).toEqual([])
    s.setValue({row, col: 0}, 1)
    expect(c.blockedValues(s,{row, col: 0})).toEqual([])
    expect(c.blockedValues(s,{row, col: 1})).toEqual([1])
    s.setValue({row, col: 1}, 2)
    expect(c.blockedValues(s,{row: 0, col: 0})).toEqual([2])
    expect(c.blockedValues(s,{row: 0, col: 1})).toEqual([1])
    s.setValue({row, col: 0}, null)
    expect(c.blockedValues(s,{row, col: 0})).toEqual([2])

    SudokuValue.ValidValues.forEach(v => {
        expect(c.allowsValue(s, {row, col: 1}, v)).toEqual(true)  // Has value 2
        expect(c.allowsValue(s, {row, col: 0}, v)).toEqual(v !== 2)  // Is another index
    })

    // Allow change of value
    s.setValue({row, col: 0}, null)
    s.setValue({row, col: 2}, 3)

    s.colIndexes.forEach(col => s.setValue({row, col}, null))
    s.setValue({row, col: 1}, 1)

    // Set to same value
    expect(c.allowsValue(s, {row, col: 1}, 1)).toEqual(true)
    expect(c.allowsValue(s, {row, col: 1}, 2)).toEqual(true)

    // Set other index to this value should fail
    expect(c.allowsValue(s, {row, col: 2}, 1)).toEqual(false)
    expect(c.allowsValue(s, {row, col: 2}, 2)).toEqual(true)
})

test("create column constraints", () => {
    const col = 1
    let c = new SudokuColumnConstraint(col)

    let s = new Sudoku(3, 3, [c])

    s.rowIndexes.forEach(row => expect(c.appliesTo({ row, col: 1})).toEqual(true))
    s.colIndexes.filter(col => col !== 1).forEach(col => {
        s.rowIndexes.forEach(row => expect(c.appliesTo({ row, col})).toEqual(false))
    })

    expect(c.blockedValues(s,{row: 0, col})).toEqual([])
    s.setValue({row: 0, col}, 1)
    expect(c.blockedValues(s,{row: 0, col})).toEqual([])
    expect(c.blockedValues(s,{row: 1, col})).toEqual([1])
    s.setValue({row: 1, col}, 2)
    expect(c.blockedValues(s,{row: 0, col})).toEqual([2])
    expect(c.blockedValues(s,{row: 1, col})).toEqual([1])
    s.setValue({row: 0, col}, null)
    expect(c.blockedValues(s,{row: 0, col})).toEqual([2])

    SudokuValue.ValidValues.forEach(v => {
        expect(c.allowsValue(s, {row: 0, col}, v)).toEqual(v !== 2)
    })
})

test("create area constraints", () => {
    const row = 1
    const col = 1
    let c = new SudokuAreaConstraint(row, col, 2)

    let s = new Sudoku(3, 3, [c])

    s.rowIndexes.forEach(row => expect(c.appliesTo({ row, col: 1})).toEqual(row !== 0))
    s.colIndexes.forEach(col => {
        s.rowIndexes.forEach(row => expect(c.appliesTo({ row, col})).toEqual(row != 0 && col != 0))
    })

    expect(c.blockedValues(s,{row, col})).toEqual([])
    s.setValue({row, col}, 1)
    expect(c.blockedValues(s,{row, col})).toEqual([])
    expect(c.blockedValues(s,{row, col: 2})).toEqual([1])
    s.setValue({row, col: 2}, 2)
    expect(c.blockedValues(s,{row, col})).toEqual([2])
    expect(c.blockedValues(s,{row, col: 2})).toEqual([1])
    s.setValue({row, col}, null)
    expect(c.blockedValues(s,{row, col})).toEqual([2])

    SudokuValue.ValidValues.forEach(v => {
        expect(c.allowsValue(s, {row, col}, v)).toEqual(v !== 2)
    })
})

import { Sudoku } from "./Sudoku"
import { AssertionError } from "assert"
import { SudokuCell } from "./SudokuCell"
import { SudokuAreaConstraint, SudokuColumnConstraint, SudokuRowConstraint } from "./SudokuConstraint"

test("create Sudokus", () => {
    let s = new Sudoku(3, 4, [])

    expect(s.nRows).toEqual(3)
    expect(s.rowIndexes).toEqual([0, 1, 2])
    expect(s.nCols).toEqual(4)
    expect(s.colIndexes).toEqual([0, 1, 2, 3])

    s.rowIndexes.forEach(row => {
        s.colIndexes.forEach(col => {
            const index = {row, col}
            expect(s.isValidIndex(index)).toEqual(true)
            expect(s.getValue(index)).toEqual(null)
            const values: (number | null)[] = SudokuCell.ValidValues
            values.push(null)
            values.forEach(v => {
                s.setValue(index, v)
                expect(s.getValue(index)).toEqual(v)
            })
        })
    })

    expect(s.isValidIndex({row: 0, col: 4})).toEqual(false)
    expect(s.isValidIndex({row: 3, col: 0})).toEqual(false)
    expect(s.isValidIndex({row: -1, col: 0})).toEqual(false)

    const invalidIndex = {row: -1, col: 0}
    expect(() => s.setValue(invalidIndex, 1)).toThrow(AssertionError)
    expect(() => s.getValue(invalidIndex)).toThrow(AssertionError)

    expect(() => new Sudoku(0,0, [])).toThrow(AssertionError)
})

test("clear sudokus", () => {
    let s = new Sudoku(3, 3, [])

    s.rowIndexes.forEach(row => {
        s.colIndexes.forEach(col => {
            const value = 1 + row + col
            s.setValue({row, col}, value)
            expect(s.getValue({row, col})).toEqual(value)
        })
    })
    s.clear()
    s.rowIndexes.forEach(row => {
        s.colIndexes.forEach(col => {
            expect(s.getValue({row, col})).toEqual(null)
        })
    })

})

test("keep sudoku consistent", () => {
    // x c  x x
    // r rc r r
    // x c  a a
    // x c  a a
    const rowConstraint = new SudokuRowConstraint(1, 0, 3)
    const columnConstraint = new SudokuColumnConstraint(1, 0, 3)
    const areaConstraint = new SudokuAreaConstraint(2,2,2)

    let s = new Sudoku(4, 4, [
        rowConstraint, columnConstraint, areaConstraint
    ])

    // Unconstrained
    s.clear()
    expect(s.isValidValue({row: 0, col: 0}, 1)).toEqual(true)
    expect(s.isValidValue({row: 0, col: 0}, 0)).toEqual(false)
    expect(s.isValidValue({row: 0, col: 0}, 10)).toEqual(false)
    s.setValue({row: 0, col: 0}, 1)
    expect(s.isValidValue({row: 0, col: 0}, 1)).toEqual(true)
    expect(s.isValidValue({row: 0, col: 0}, 2)).toEqual(true)
    expect(s.blockedValues({row: 0, col: 0})).toEqual([])
    expect(s.blockedValues({row: 0, col: 1})).toEqual([])

    // Column constraint
    s.clear()
    expect(s.isValidValue({row: 0, col: 1}, 1)).toEqual(true)
    s.setValue({row: 0, col: 1}, 1)
    expect(s.isValidValue({row:1, col: 1}, 1)).toEqual(false)
    expect(s.blockedValues({row: 0, col: 1})).toEqual([])
    expect(s.blockedValues({row: 1, col: 1})).toEqual([1])
    expect(s.allowedValues({row: 0, col: 1})).toEqual(SudokuCell.ValidValues)
    expect(s.allowedValues({row: 1, col: 1})).toEqual(SudokuCell.ValidValues.filter(v => v !== 1))

    // Row constraint
    s.clear()
    expect(s.isValidValue({row: 1, col: 0}, 1)).toEqual(true)
    s.setValue({row: 1, col: 2}, 1)
    expect(s.isValidValue({row:1, col: 3}, 1)).toEqual(false)
    expect(s.blockedValues({row: 1, col: 2})).toEqual([])
    expect(s.blockedValues({row: 1, col: 3})).toEqual([1])

    // Area constraint
    s.clear()
    expect(s.isValidValue({row: 2, col: 2}, 1)).toEqual(true)
    s.setValue({row: 2, col: 2}, 1)
    expect(s.isValidValue({row: 2, col: 3}, 1)).toEqual(false)
    expect(s.blockedValues({row: 2, col: 2})).toEqual([])
    expect(s.blockedValues({row: 2, col: 3})).toEqual([1])

    // Row and Column
    s.clear()
    s.setValue({row: 0, col: 1}, 1) // Column constraint
    s.setValue({row: 1, col: 0}, 2) // Row constraint
    expect(s.isValidValue({row: 1, col: 1}, 1)).toEqual(false)
    expect(s.isValidValue({row: 1, col: 1}, 2)).toEqual(false)
})

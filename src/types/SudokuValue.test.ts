import { AssertionError } from "assert"
import { SudokuCell } from "./SudokuCell"

test('create sudoku values', () => {
    // Default empty
    let v = new SudokuCell()
    expect(v.value).toBe(null)

    // Can be instantiated with any valid value
    expect(SudokuCell.ValidValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    SudokuCell.ValidValues.forEach(v => expect(new SudokuCell(v).value).toBe(v))
    expect(SudokuCell.isValidValue(1)).toEqual(true)
    expect(SudokuCell.isValidValue(-1)).toEqual(false)

    // Throws error on instantiation with illegal value
    expect(() => new SudokuCell(-1)).toThrow(AssertionError)
});

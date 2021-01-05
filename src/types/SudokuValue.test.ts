import { AssertionError } from "assert"
import { SudokuValue } from "./SudokuValue"

test('create sudoku values', () => {
    // Default empty
    let v = new SudokuValue()
    expect(v.value).toBe(null)

    // Can be instantiated with any valid value
    expect(SudokuValue.ValidValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    SudokuValue.ValidValues.forEach(v => expect(new SudokuValue(v).value).toBe(v))
    expect(SudokuValue.isValidValue(1)).toEqual(true)
    expect(SudokuValue.isValidValue(-1)).toEqual(false)

    // Throws error on instantiation with illegal value
    expect(() => new SudokuValue(-1)).toThrow(AssertionError)
});

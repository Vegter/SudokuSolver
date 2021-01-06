import { SudokuCell } from "./SudokuCell"

test("create sudoku cell", () => {
    let c = new SudokuCell()
    expect(c.value).toEqual(null)

    SudokuCell.ValidValues.forEach(value => {
        c.value = value
        expect(c.value).toEqual(value)
    })

    c.value = 1
    let c2 = new SudokuCell()
    expect(c.equals(c2)).toBe(false)
    c2.value = c.value
    expect(c.equals(c2)).toBe(true)

    c.value = null
    expect(c.isNull).toBe(true)
})
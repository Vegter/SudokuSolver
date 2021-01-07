import { SudokuFactory } from "./SudokuFactory"
import { SudokuVariants } from "./SudokuVariants"

test("sudoku factory", () => {
    let s = SudokuFactory.createNRCSudoku()
    expect(s.constraints.length).toEqual(9 + 9 + 9 + 4)

    s = SudokuFactory.createBasicSudoku()
    expect(s.constraints.length).toEqual(9 + 9 + 9)

    s = SudokuFactory.create(SudokuVariants.Basic, true)
    expect(s.constraints.length).toEqual(9 + 9 + 9)
    expect(s.indexes.map(index => s.getValue(index)).filter(v => v).length).toEqual(27)

    s = SudokuFactory.create(SudokuVariants.Complex, true)
    expect(s.constraints.length).toEqual(9 + 9 + 9)
    expect(s.indexes.map(index => s.getValue(index)).filter(v => v).length).toEqual(23)

    s = SudokuFactory.create(SudokuVariants.Basic, false)
    expect(s.indexes.map(index => s.getValue(index)).filter(v => v).length).toEqual(0)

    s = SudokuFactory.create(SudokuVariants.NRC, true)
    expect(s.constraints.length).toEqual(9 + 9 + 9 + 4)
    expect(s.indexes.map(index => s.getValue(index)).filter(v => v).length).toEqual(15)
})
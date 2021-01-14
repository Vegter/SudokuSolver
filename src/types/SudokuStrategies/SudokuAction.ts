import { SudokuConstraint } from "../SudokuConstraint"
import { SudokuIndex } from "../Sudoku"
import { SudokuValue } from "../SudokuCell"

export interface SudokuAction {
    motivation: string
    constraints: SudokuConstraint[]
    index: SudokuIndex
    allowedValues: SudokuValue[]
}

export function logAction(action: SudokuAction) {
    console.log(action.motivation, action.index.row, action.index.col, action.allowedValues)
}

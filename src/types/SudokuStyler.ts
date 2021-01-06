import { Sudoku } from "./Sudoku"
import { SudokuAreaConstraint } from "./SudokuConstraint"

export function getStyle(sudoku: Sudoku, row: number, col: number) {
    const defaultBorder = "1px solid black"
    const boldBorder = "2px solid black"
    const style = {
        borderTop: defaultBorder,
        borderRight: defaultBorder,
        borderBottom: defaultBorder,
        borderLeft: defaultBorder,
        backgroundColor: "inherit"
    }
    for (let constraint of sudoku.constraints) {
        if (constraint instanceof SudokuAreaConstraint) {
            if ([1, 5].includes(constraint.firstRow) || [1,5].includes(constraint.firstCol)) {
                if (constraint.appliesTo({row, col})) {
                    style.backgroundColor = "lightGrey"
                }
                continue
            }
            if (row === constraint.firstRow) {
                style.borderTop = boldBorder
            } else if (row === constraint.lastRow) {
                style.borderBottom = boldBorder
            }
            if (col === constraint.firstCol) {
                style.borderLeft = boldBorder
            } else if (col === constraint.lastCol) {
                style.borderRight = boldBorder
            }
        }
    }
    return style
}
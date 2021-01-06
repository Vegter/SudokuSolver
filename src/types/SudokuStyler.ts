import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuAreaConstraint } from "./SudokuConstraint"

export function getStyle(sudoku: Sudoku, index: SudokuIndex) {
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
                if (constraint.appliesTo(index)) {
                    style.backgroundColor = "lightGrey"
                }
                continue
            }
            if (index.row === constraint.firstRow) {
                style.borderTop = boldBorder
            } else if (index.row === constraint.lastRow) {
                style.borderBottom = boldBorder
            }
            if (index.col === constraint.firstCol) {
                style.borderLeft = boldBorder
            } else if (index.col === constraint.lastCol) {
                style.borderRight = boldBorder
            }
        }
    }
    return style
}
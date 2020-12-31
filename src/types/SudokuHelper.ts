import { Sudoku } from "./Sudoku"
import { SudokuConstraint } from "./SudokuConstraint"

export class SudokuHelper {
    sudoku: Sudoku
    constraints: SudokuConstraint[]
    hints: number[][][]

    constructor(sudoku: Sudoku, constraints: SudokuConstraint[]) {
        this.sudoku = sudoku
        this.constraints = constraints
        this.hints = []
    }

    update() {
        for (let row = 0; row < this.sudoku.nRows; row++) {
            this.hints[row] = []
            for (let col = 0; col < this.sudoku.nCols; col++) {
                this.hints[row][col] = []
                const value = this.sudoku.contents[row][col]
                if (value == null) {
                    const validValues = Sudoku.Values.filter(value => {
                        for (let constraint of this.constraints) {
                            if (constraint.appliesTo(row, col) && !constraint.isValid(value)) {
                                return false
                            }
                        }
                        return true
                    })
                    this.hints[row][col] = validValues
                } else {
                    this.hints[row][col] = []
                }
            }
        }
    }

    isSinglePossibility(row: number, col: number): string {
        let result = ""
        for (let constraint of this.constraints.filter(c => c.appliesTo(row, col))) {
            const rowCols = constraint.rowCols()
            // Find values that are single possibilities
            // Or only valid for a single row or column
            for (let value of this.hints[row][col]) {
                let found = false
                let rows = new Set()
                let cols = new Set()
                let crows = new Set()
                let ccols = new Set()
                for (let [crow, ccol] of rowCols) {
                    rows.add(crow)
                    cols.add(ccol)
                    let hints = this.hints[crow][ccol]
                    if (hints.includes(value)) {
                        // Value is found in another cell of the same constraint
                        found = true
                        // Value is found at specific row and column
                        crows.add(crow)
                        ccols.add(ccol)
                    }
                }
                if (! found) {
                    // Value is not found in any other cell of the same constraint
                    result += `${value} is only possibility`
                }
                if (rows.size === 1 || cols.size === 1) {
                    // Single column or row
                    if (crows.size === 1 && ccols.size === 1) {
                        // value is a single row or single column value
                        result += `${value} is single row-col possibility`
                    }
                } else {
                    // Area constraint
                    if (crows.size === 1 || ccols.size === 1) {
                        // value is a single row or single column value
                        result += `${value} always in same col-row`
                    }
                }
            }
        }
        return result
    }
}
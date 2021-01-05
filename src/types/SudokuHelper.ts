import { Sudoku, SudokuIndex } from "./Sudoku"
import { TSudokuValue } from "./SudokuValue"

type IndexInfo = {
    allowedValues: TSudokuValue[]
    mandatoryValue: TSudokuValue
}

export class SudokuHelper {
    private _sudoku: Sudoku
    private _info: IndexInfo[][]

    constructor(sudoku: Sudoku) {
        this._sudoku = sudoku

        this._info = []
        this._sudoku.rowIndexes.forEach(row => {
            this._info[row] = []
            this._sudoku.colIndexes.forEach(col => {
                this._info[row][col] = {
                    allowedValues: [],
                    mandatoryValue: null
                }
            })
        })
    }

    private getInfo(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col]
    }

    public analyze() {
        // Determine allowed values
        this._sudoku.rowIndexes.forEach(row => {
            this._sudoku.colIndexes.forEach(col => {
                const value = this._sudoku.getValue({row, col})
                if (value === null) {
                    this._info[row][col].allowedValues = this._sudoku.allowedValues({row, col})
                } else {
                    this._info[row][col].allowedValues = [value]
                }
            })
        })

        // Find any mandatory values
        this._sudoku.rowIndexes.forEach(row => {
            this._sudoku.colIndexes.forEach(col => {
                const index = {row, col}
                if (this.allowedValues(index).length === 1) {
                    this._info[row][col].mandatoryValue = this.allowedValues(index)[0]
                } else if (this._sudoku.getValue(index) === null) {
                    this.setMandatoryValue(index)
                } else {
                    this._info[row][col].mandatoryValue = null
                }
            })
        })
    }

    private setMandatoryValue(index: SudokuIndex) {
        const info = this.getInfo(index)
        const constraints = this._sudoku.constraints.filter(c => c.appliesTo(index))
        for (let value of info.allowedValues) {
            // Try finding a value with only one possible index within a constraint
            for (let constraint of constraints) {
                let nPossibilities = 0
                for (let constraintIndex of constraint.constraintIndexes(this._sudoku)) {
                    if (this.getInfo(constraintIndex).allowedValues.includes(value)) {
                        nPossibilities += 1
                    }
                    if (nPossibilities > 1) {
                        break;
                    }
                }
                if (nPossibilities === 1) {
                    info.mandatoryValue = value
                    return
                }
            }
        }
    }

    public allowedValues(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].allowedValues
    }

    public mandatoryValue(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].mandatoryValue
    }
}

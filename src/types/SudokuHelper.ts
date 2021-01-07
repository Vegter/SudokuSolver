import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuValue } from "./SudokuCell"
import { SudokuAreaConstraint } from "./SudokuConstraint"

type IndexInfo = {
    allowedValues: SudokuValue[]
    mandatoryValue: SudokuValue
    allowedValuesCopies: SudokuIndex[]
    singleRowColumnValues: SudokuValue[]
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
                    mandatoryValue: null,
                    allowedValuesCopies: [],
                    singleRowColumnValues: []
                }
            })
        })
    }

    private getInfo(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col]
    }

    public analyze() {
        for (let index of this._sudoku.indexes) {
            const {row, col} = index
            const value = this._sudoku.getValue(index)
            if (value === null) {
                this._info[row][col].allowedValues = this._sudoku.allowedValues(index)
            } else {
                this._info[row][col].allowedValues = [value]
            }
        }

        // Find any mandatory values
        for (let index of this._sudoku.indexes) {
            const {row, col} = index
            if (this.allowedValues(index).length === 1) {
                this._info[row][col].mandatoryValue = this.allowedValues(index)[0]
            } else {
                this.setMandatoryValue(index)
            }
        }

        const emptyIndexes = this._sudoku.indexes
            .filter(index => this._sudoku.getValue(index) === null)

        // Find any identical allowed values (pairs)
        for (let index of emptyIndexes) {
            const {row, col} = index
            this._info[row][col].allowedValuesCopies = this.getIdenticalAllowedValues(index)
        }

        // Find any single column/row values
        for (let index of emptyIndexes) {
            const {row, col} = index
            this._info[row][col].singleRowColumnValues = this.getSingleRowColumnValues(index)
        }
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

    private getIdenticalAllowedValues(index: SudokuIndex): SudokuIndex[] {
        const allowedValues = this.allowedValues(index)

        const constraints = this._sudoku.constraints
            .filter(c => c.appliesTo(index))

        const result = new Set<SudokuIndex>()
        for (let constraint of constraints) {
            const identicalIndexes = constraint.constraintIndexes(this._sudoku)
                .filter(i => allowedValues.join('') === this.allowedValues(i).join(''))
            if (identicalIndexes.length > 1 && identicalIndexes.length === allowedValues.length) {
                identicalIndexes.forEach(i => result.add(i))
            }
        }
        return Array.from(result)
    }

    private getSingleRowColumnValues(index: SudokuIndex): SudokuValue[] {
        const info = this.getInfo(index)
        const constraints = this._sudoku.constraints
            .filter(c => c.appliesTo(index))
            .filter(constraint => constraint instanceof SudokuAreaConstraint)

        const result: SudokuValue[] = []
        for (let value of info.allowedValues) {
            // Try finding a value with all possible values on one row or one column
            for (let constraint of constraints) {
                let rows = new Set()
                let cols = new Set()
                for (let constraintIndex of constraint.constraintIndexes(this._sudoku)) {
                    if (this.getInfo(constraintIndex).allowedValues.includes(value)) {
                        rows.add(constraintIndex.row)
                        cols.add(constraintIndex.col)
                    }
                }
                if (rows.size === 1 || cols.size === 1) {
                    result.push(value)
                }
            }
        }
        return result
    }

    public getHint(): [SudokuIndex, SudokuValue] | undefined {
        for (let index of this._sudoku.indexes) {
            const mandatoryValue = this.mandatoryValue(index)
            if (this._sudoku.getValue(index) === null && mandatoryValue !== null) {
                return [index, mandatoryValue]
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

    public allowedValuesCopies(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].allowedValuesCopies
    }

    public singleRowColumnValues(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].singleRowColumnValues
    }
}

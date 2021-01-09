import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuValue } from "./SudokuCell"
import { SudokuAreaConstraint } from "./SudokuConstraint"
import { getAllSubsets } from "../utils"

type IndexInfo = {
    allowedValues: SudokuValue[]
    mandatoryValue: SudokuValue
    pairs: SudokuIndex[]
    hiddenPairs: SudokuValue[]
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
                    pairs: [],
                    hiddenPairs: [],
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
                this._info[row][col].mandatoryValue = this.getMandatoryValue(index)
            }
        }

        const emptyIndexes = this._sudoku.indexes
            .filter(index => this._sudoku.getValue(index) === null)

        // Find any identical allowed values (pairs)
        for (let index of emptyIndexes) {
            const {row, col} = index
            this._info[row][col].pairs = this.getPairs(index)
            this._info[row][col].hiddenPairs = this.getHiddenPairs(index)
        }

        // Find any single column/row values
        for (let index of emptyIndexes) {
            const {row, col} = index
            this._info[row][col].singleRowColumnValues = this.getSingleRowColumnValues(index)
        }
    }

    private getMandatoryValue(index: SudokuIndex): SudokuValue {
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
                        // Stop searching this constraint as it allows for multiple indexes for the given value
                        break;
                    }
                }
                if (nPossibilities === 1) {
                    // The given value is mandatory for this index
                    return value
                }
            }
        }
        return null
    }

    private getPairs(index: SudokuIndex): SudokuIndex[] {
        const allowedValues = this.allowedValues(index)

        // Pairs within a constraint with identical allowed values is not possible
        if (allowedValues.length === 1) {
            return []
        }

        // Find any applicable constraints
        const constraints = this._sudoku.constraints
            .filter(c => c.appliesTo(index))

        const result: SudokuIndex[] = []
        for (let constraint of constraints) {
            const identicalIndexes = constraint.constraintIndexes(this._sudoku)
                .filter(i => allowedValues.join('') === this.allowedValues(i).join(''))
            // A pair is a set of indexes with identical values, eg [[x, y] [x, y]] or [[x, y, z] [x, y, z]]
            if (identicalIndexes.length === allowedValues.length) {
                identicalIndexes.forEach(i => {
                    if (! result.find(index => index.row === i.row && index.col === i.col)) {
                        result.push(i)
                    }
                })
            }
        }
        return result
    }

    private getHiddenPairs(index: SudokuIndex): SudokuValue[] {
        const allowedValues = this.allowedValues(index)

        // Pairs within a constraint with identical allowed values is not possible
        if (allowedValues.length === 1) {
            return []
        }

        // Search for subsets of a minimum length of 2 and less than the length of the allowed values
        // Length 1 cannot result in a usable set, length allowed values is a naked pair (and not hidden)
        const subsets = getAllSubsets(allowedValues)
            .filter((set: number[]) => 2 <= set.length && set.length < allowedValues.length)
        subsets.sort((el1: number[], el2: number[]) => el2.length - el1.length)

        // Find any applicable constraints
        const constraints = this._sudoku.constraints
            .filter(c => c.appliesTo(index))

        const result = new Set<SudokuValue>()
        for (let subset of subsets) {
            // Check every subset
            for (let constraint of constraints) {
                // Find all indexes that contain this subset
                const identicalIndexes = constraint.constraintIndexes(this._sudoku)
                    .filter(i => {
                        for (let n of subset) {
                            if (!this.allowedValues(i).includes(n)) return false
                        }
                        return true
                    })
                if (identicalIndexes.length !== subset.length) {
                    continue
                }

                // Find all indexes that don't contain any of the subset
                const inIndexes = constraint.constraintIndexes(this._sudoku)
                    .filter(i => {
                        for (let n of subset) {
                            if (this.allowedValues(i).includes(n)) return true
                        }
                        return false
                    })
                if (identicalIndexes.length !== inIndexes.length) {
                    continue
                }

                subset.forEach((v: number) => result.add(v))
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

    public fillAllowedValues() {
        for (let index of this._sudoku.indexes) {
            const value = this._sudoku.getValue(index)
            if (value === null) {
                this.getInfo(index).allowedValues = this._sudoku.allowedValues(index)
            } else {
                this.getInfo(index).allowedValues = [value]
            }
        }
    }

    public fillMandatoryValues() {
        for (let index of this._sudoku.indexes) {
            const value = this._sudoku.getValue(index)
            if (value !== null) {
                // Value is already known, do not calculate any mandatory value
                this.getInfo(index).mandatoryValue = null
            } else if (this.allowedValues(index).length === 1) {
                // Only one value is possible for the index
                this.getInfo(index).mandatoryValue = this.allowedValues(index)[0]
            } else {
                // Check is any of the values is unique within a constraint
                this.getInfo(index).mandatoryValue = this.getMandatoryValue(index)
            }
        }
    }

    public fillPairs() {
        for (let index of this._sudoku.indexes) {
            const info = this.getInfo(index)
            // Find any indexes with identical allowed values
            info.pairs = this.getPairs(index)
        }
    }

    public fillHiddenPairs() {
        for (let index of this._sudoku.indexes) {
            const info = this.getInfo(index)
            // Find any indexes with hidden identical allowed values
            info.hiddenPairs = this.getHiddenPairs(index)
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

    public pairs(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].pairs
    }

    public hiddenPairs(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].hiddenPairs
    }

    public singleRowColumnValues(index: SudokuIndex) {
        const {row, col} = index
        return this._info[row][col].singleRowColumnValues
    }
}

import assert from "assert"
import { SudokuValue, TSudokuValue } from "./SudokuValue"
import { range } from "../utils"
import { SudokuConstraint } from "./SudokuConstraint"

export type SudokuIndex = {
    row: number,
    col: number
}

export class Sudoku {
    private _nRows: number
    private _nCols: number
    private _constraints: SudokuConstraint[]
    private _contents: SudokuValue[][]

    constructor(nRows: number, nCols: number, constraints: SudokuConstraint[]) {
        assert(nRows > 0 && nCols > 0)
        this._nRows = nRows
        this._nCols = nCols
        this._constraints = constraints

        this._contents = []
        for (let row of this.rowIndexes) {
            this._contents[row] = []
            for (let col of this.colIndexes) {
                this.setValue({row, col}, null)
            }
        }
    }

    public clear(): void {
        this.rowIndexes.forEach(row => {
            this.colIndexes.forEach(col => {
                this.setValue({row, col}, null)
            })
        })
    }

    get nRows(): number {
        return this._nRows
    }

    get nCols(): number {
        return this._nCols
    }

    get rowIndexes(): number[] {
        return range(this._nRows)
    }

    get colIndexes(): number[] {
        return range(this._nCols)
    }

    get constraints(): SudokuConstraint[] {
        return this._constraints
    }

    public isValidIndex(index: SudokuIndex): boolean {
        const {row, col} = index
        return 0 <= row && row < this._nRows &&
            0 <= col && col < this._nCols
    }

    public isValidValue(index: SudokuIndex, value: TSudokuValue): boolean {
        if (!SudokuValue.isValidValue(value)) {
            return false
        }
        // value is potentially valid, next check constraints
        for (let constraint of this._constraints) {
            // If any constraint fails, then the value is not valid for this index
            if (! constraint.allowsValue(this, index, value)) {
                return false
            }
        }
        // All constraints pass => value is valid for this index
        return true
    }

    public blockedValues(index: SudokuIndex): TSudokuValue[] {
        // const value = this.getValue(index)
        // if (value !== null) {
        //     return SudokuValue.ValidValues.filter(v => v !== value)
        // }
        const blockedValues = new Set<TSudokuValue>()
        for (let constraint of this._constraints) {
            constraint.blockedValues(this, index).forEach(v => blockedValues.add(v))
        }
        return Array.from(blockedValues)
    }

    public allowedValues(index: SudokuIndex): TSudokuValue[] {
        // const value = this.getValue(index)
        // if (value !== null) {
        //     return [value]
        // }
        const blockedValues = this.blockedValues(index)
        return SudokuValue.ValidValues.filter(v => !blockedValues.includes(v))
    }

    public setValue(index: SudokuIndex, value: TSudokuValue): void {
        assert(this.isValidIndex(index))
        const newValue = new SudokuValue(value)
        assert(this.isValidValue(index, value))
        const {row, col} = index
        this._contents[row][col] = newValue
    }

    public getValue(index: SudokuIndex): TSudokuValue {
        assert(this.isValidIndex(index))
        const {row, col} = index
        return this._contents[row][col].value
    }
}

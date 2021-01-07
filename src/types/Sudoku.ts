import assert from "assert"
import { SudokuCell, SudokuValue } from "./SudokuCell"
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
    private _contents: SudokuCell[][]

    public readonly rowIndexes: number[]
    public readonly colIndexes: number[]
    public readonly indexes: SudokuIndex[]

    constructor(nRows: number, nCols: number, constraints: SudokuConstraint[]) {
        assert(nRows > 0 && nCols > 0)
        this._nRows = nRows
        this._nCols = nCols
        this._constraints = constraints

        this.rowIndexes = range(this._nRows)
        this.colIndexes = range(this._nCols)
        this.indexes = this._indexes

        this._contents = []
        for (let row of this.rowIndexes) {
            this._contents[row] = []
            for (let col of this.colIndexes) {
                this.setValue({row, col}, null)
            }
        }
    }

    public clear(): void {
        for (let index of this.indexes) {
            this.setValue(index, null)
        }
    }

    get nRows(): number {
        return this._nRows
    }

    get nCols(): number {
        return this._nCols
    }

    private get _indexes(): SudokuIndex[] {
        const indexes = []
        for (let row of this.rowIndexes) {
            for (let col of this.colIndexes) {
                indexes.push({row, col})
            }
        }
        return indexes
    }

    get constraints(): SudokuConstraint[] {
        return this._constraints
    }

    public isValidIndex(index: SudokuIndex): boolean {
        const {row, col} = index
        return 0 <= row && row < this._nRows &&
               0 <= col && col < this._nCols
    }

    public isValidValue(index: SudokuIndex, value: SudokuValue): boolean {
        if (!SudokuCell.isValidValue(value)) {
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

    public blockedValues(index: SudokuIndex): SudokuValue[] {
        const blockedValues = new Set<SudokuValue>()
        for (let constraint of this._constraints) {
            constraint.blockedValues(this, index).forEach(v => blockedValues.add(v))
        }
        return Array.from(blockedValues)
    }

    public allowedValues(index: SudokuIndex): SudokuValue[] {
        const blockedValues = this.blockedValues(index)
        return SudokuCell.ValidValues.filter(v => !blockedValues.includes(v))
    }

    public setValue(index: SudokuIndex, value: SudokuValue): void {
        assert(this.isValidIndex(index))
        const newValue = new SudokuCell(value)
        assert(this.isValidValue(index, value))
        const {row, col} = index
        this._contents[row][col] = newValue
    }

    public getValue(index: SudokuIndex): SudokuValue {
        assert(this.isValidIndex(index))
        const {row, col} = index
        return this._contents[row][col].value
    }
}

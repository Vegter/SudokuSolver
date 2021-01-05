import { TSudokuValue } from "./SudokuValue"
import { Sudoku, SudokuIndex } from "./Sudoku"
import { range } from "../utils"

export abstract class SudokuConstraint {
    abstract appliesTo(index: SudokuIndex): boolean

    abstract constraintIndexes(sudoku: Sudoku): SudokuIndex[]

    blockedValues(sudoku: Sudoku, index: SudokuIndex): TSudokuValue[] {
        if (this.appliesTo(index)) {
            const value = sudoku.getValue(index)
            return this.constraintIndexes(sudoku)
                .map(index => sudoku.getValue(index))
                .filter(v => v !== null && v !== value)
        } else {
            return []
        }
    }

    allowsValue(sudoku: Sudoku, index: SudokuIndex, value: TSudokuValue) {
        if (value === null) {
            // It is always possible to clear a value
            return true
        } else if (this.appliesTo(index)) {
            for (let constraintIndex of this.constraintIndexes(sudoku)) {
                if (constraintIndex.row === index.row && constraintIndex.col === index.col) {
                    // Overwrite of own value should be possible
                    continue
                }
                if (sudoku.getValue(constraintIndex) === value) {
                    // Value is already present in the constrained area
                    return false
                }
            }
        }
        return true
    }
}

export class SudokuRowConstraint extends SudokuConstraint {
    private _row: number

    constructor(row: number) {
        super()
        this._row = row
    }

    appliesTo(index: SudokuIndex): boolean {
        return index.row === this._row
    }

    constraintIndexes(sudoku: Sudoku): SudokuIndex[] {
        return sudoku.colIndexes.map(col => ({row: this._row, col}))
    }
}

export class SudokuColumnConstraint extends SudokuConstraint {
    private _col: number

    constructor(col: number) {
        super()
        this._col = col
    }

    appliesTo(index: SudokuIndex): boolean {
        return index.col === this._col
    }

    constraintIndexes(sudoku: Sudoku): SudokuIndex[] {
        return sudoku.rowIndexes.map(row => ({row, col: this._col}))
    }
}

export class SudokuAreaConstraint extends SudokuConstraint {
    private _row: number
    private _col: number
    private _size: number

    constructor(row: number, col: number, size: number = 3) {
        super()
        this._row = row
        this._col = col
        this._size = size
    }

    get firstRow(): number {
        return this._row
    }

    get lastRow(): number {
        return this._row + this._size - 1
    }

    get firstCol(): number {
        return this._col
    }

    get lastCol(): number {
        return this._col + this._size - 1
    }

    appliesTo(index: SudokuIndex): boolean {
        return this._row <= index.row && index.row < this._row + this._size &&
            this._col <= index.col && index.col < this._col + this._size
    }

    constraintIndexes(sudoku: Sudoku): SudokuIndex[] {
        const indexes: SudokuIndex[] = []
        range(this._row, this._row + this._size).forEach(row => {
            range(this._col, this._col + this._size).forEach(col => {
                indexes.push({row, col})
            })
        })
        return indexes
    }
}
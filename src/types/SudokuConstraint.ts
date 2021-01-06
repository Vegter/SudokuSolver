import { SudokuValue } from "./SudokuCell"
import { Sudoku, SudokuIndex } from "./Sudoku"
import { range } from "../utils"

export type SudokuArea = {
    from: SudokuIndex
    to: SudokuIndex
}

export abstract class SudokuConstraint {
    private readonly _area: SudokuArea

    protected constructor(area: SudokuArea) {
        this._area = area
    }

    get firstRow(): number {
        return this._area.from.row
    }

    get lastRow(): number {
        return this._area.to.row
    }

    get firstCol(): number {
        return this._area.from.col
    }

    get lastCol(): number {
        return this._area.to.col
    }

    appliesTo(index: SudokuIndex): boolean {
        return this.firstRow <= index.row && index.row <= this.lastRow &&
               this.firstCol <= index.col && index.col <= this.lastCol
    }

    constraintIndexes(sudoku: Sudoku): SudokuIndex[] {
        let indexes = []
        for (let row of range(this.firstRow, this.lastRow + 1)) {
            for (let col of range(this.firstCol, this.lastCol + 1)) {
                indexes.push({row, col})
            }
        }
        return indexes
    }

    blockedValues(sudoku: Sudoku, index: SudokuIndex): SudokuValue[] {
        if (this.appliesTo(index)) {
            const value = sudoku.getValue(index)    // don't block current value
            return this.constraintIndexes(sudoku)
                .map(index => sudoku.getValue(index))
                .filter(v => !(v === null || v === value))
        } else {
            return []
        }
    }

    allowsValue(sudoku: Sudoku, index: SudokuIndex, value: SudokuValue) {
        if (value === null) {
            // It is always possible to clear a value
            return true
        } else if (this.appliesTo(index)) {
            // Check constraint
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
    constructor(row: number, colFrom: number = 0, colTo: number = 8) {
        super({from: {row, col: colFrom}, to: {row, col: colTo}})
    }
}

export class SudokuColumnConstraint extends SudokuConstraint {
    constructor(col: number, rowFrom: number = 0, rowTo: number = 8) {
        super({from: {row: rowFrom, col}, to: {row: rowTo, col}})
    }
}

export class SudokuAreaConstraint extends SudokuConstraint {
    constructor(row: number, col: number, size: number = 3) {
        super({from: {row, col}, to: {row: row + size - 1, col: col + size - 1}})
    }
}
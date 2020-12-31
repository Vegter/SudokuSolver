import { Sudoku } from "./Sudoku"

export abstract class SudokuConstraint {
    public sudoku: Sudoku

    constructor(sudoku: Sudoku) {
        this.sudoku = sudoku
    }

    isValid(value: number): boolean {
        for (let [row, col] of this.rowCols()) {
            if (this.sudoku.contents[row][col] === value) {
                return false
            }
        }
        return true
    }

    abstract appliesTo(row: number, col: number): boolean

    abstract rowCols(): number[][]
}

export class SudokuRowConstraint extends SudokuConstraint {
    public row: number

    constructor(sudoku: Sudoku, row: number) {
        super(sudoku)
        this.row = row
    }

    appliesTo(row: number, col: number): boolean {
        return row === this.row
    }

    rowCols(): number[][] {
        const rowCols = []
        for (let col = 0; col < this.sudoku.nCols; col++) {
            rowCols.push([this.row, col])
        }
        return rowCols
    }
}

export class SudokuColumnConstraint extends SudokuConstraint {
    public col: number

    constructor(sudoku: Sudoku, col: number) {
        super(sudoku)
        this.col = col
    }

    appliesTo(row: number, col: number): boolean {
        return col === this.col
    }

    rowCols(): number[][] {
        const rowCols = []
        for (let row = 0; row < this.sudoku.nRows; row++) {
            rowCols.push([row, this.col])
        }
        return rowCols
    }
}

export class SudokuAreaConstraint extends SudokuConstraint {
    public row: number
    public col: number

    constructor(sudoku: Sudoku, row: number, col: number) {
        super(sudoku)
        this.row = row
        this.col = col
    }

    appliesTo(row: number, col: number): boolean {
        return this.row <= row && row < this.row + 3 &&
            this.col <= col && col < this.col + 3
    }

    rowCols(): number[][] {
        const rowCols = []
        for (let row = this.row; row < this.row + 3; row++) {
            for (let col = this.col; col < this.col + 3; col++) {
                rowCols.push([row, col])
            }
        }
        return rowCols
    }
}
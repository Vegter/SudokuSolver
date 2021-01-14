import { SudokuIndex } from "../Sudoku"
import { SudokuValue } from "../SudokuCell"
import { SudokuHelper } from "../SudokuHelper"
import { SudokuAction } from "./SudokuAction"

export abstract class SudokuStrategy {
    protected helper: SudokuHelper

    constructor(helper: SudokuHelper) {
        this.helper = helper
    }

    public abstract values(index: SudokuIndex): SudokuValue[]

    public abstract process(index: SudokuIndex): SudokuAction[]

    get sudoku() {
        return this.helper.sudoku
    }

    get indexInfo() {
        return this.helper.indexInfo
    }
}

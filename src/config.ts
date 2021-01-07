import { SudokuVariants } from "./types/SudokuVariants"

export interface SudokuOptions {
    showPossibleValues: boolean
    showHint: boolean
    showPairs: boolean
    showHiddenPairs: boolean
    showSingleRowColumnValues: boolean
}

export const Default = {
    sudokuVariant: SudokuVariants.Basic,
    options: {
        showPossibleValues: false,
        showHint: false,
        showPairs: false,
        showHiddenPairs: false,
        showSingleRowColumnValues: false
    }
}

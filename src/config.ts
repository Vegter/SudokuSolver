import { SudokuVariants } from "./types/SudokuVariants"

export interface SudokuOptions {
    showPossibleValues: boolean,
    showHint: boolean,
    showPairs: boolean,
    showSingleRowColumnValues: boolean
}

export const Default = {
    sudokuVariant: SudokuVariants.NRC,
    options: {
        showPossibleValues: false,
        showHint: false,
        showPairs: false,
        showSingleRowColumnValues: false
    }
}

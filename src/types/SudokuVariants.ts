import { SudokuFactory } from "./SudokuFactory"
import { Sudoku } from "./Sudoku"

export interface SudokuVariant {
    id: string
    name: string
    create: () => Sudoku
}

export const SudokuVariants = {
    Basic: {
        id: "Basic",
        name: "Basic Sudoku",
        create: SudokuFactory.createBasicSudoku
    },
    NRC: {
        id: "NRC",
        name: "NRC Sudoku",
        create: SudokuFactory.createNRCSudoku
    }
}

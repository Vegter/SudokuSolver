import { SudokuFactory } from "./SudokuFactory"
import { Sudoku } from "./Sudoku"

export interface SudokuVariant {
    id: string
    name: string
    create: () => Sudoku
    fill: (sudoku: Sudoku) => void
}

export const SudokuVariants = {
    Basic: {
        id: "Basic",
        name: "Basic Sudoku",
        create: SudokuFactory.createBasicSudoku,
        fill: SudokuFactory.fillBasicSudoku
    },
    NRC: {
        id: "NRC",
        name: "NRC Sudoku",
        create: SudokuFactory.createNRCSudoku,
        fill: SudokuFactory.fillNRCSudoku
    }
}

import { SudokuFactory } from "./SudokuFactory"
import { Sudoku } from "./Sudoku"

export interface SudokuVariant {
    id: string
    name: string
    create: () => Sudoku
    fill: (sudoku: Sudoku, id?: string) => Promise<void>
    dataURL: string
}

export const SudokuVariants = {
    Basic: {
        id: "Basic",
        name: "Standard Sudoku",
        create: SudokuFactory.createBasicSudoku,
        fill: SudokuFactory.fillBasicSudoku,
        dataURL: "/data/basic.json"
    },
    NRC: {
        id: "NRC",
        name: "NRC Sudoku",
        create: SudokuFactory.createNRCSudoku,
        fill: SudokuFactory.fillNRCSudoku,
        dataURL: "/data/nrc.json"
    }
}

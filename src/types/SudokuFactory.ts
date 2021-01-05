import { Sudoku } from "./Sudoku"
import { range } from "../utils"
import { SudokuAreaConstraint, SudokuColumnConstraint, SudokuConstraint, SudokuRowConstraint } from "./SudokuConstraint"

export class SudokuFactory {
    private constructor() {
        // Don't instantiate
    }

    private static getAreaConstraints(areas: number[]): SudokuConstraint[] {
        const areaConstraints: SudokuConstraint[] = []
        areas.forEach(row => {
            areas.forEach(col => {
                areaConstraints.push(new SudokuAreaConstraint(row, col))
            })
        })
        return areaConstraints
    }

    private static getBasicConstraints(nRows: number, nCols: number): SudokuConstraint[] {
        const rowConstraints = range(nRows).map(r => new SudokuRowConstraint(r))
        const colConstraints = range(nCols).map(c => new SudokuColumnConstraint(c))
        const areaConstraints = SudokuFactory.getAreaConstraints([0, 3, 6])
        return [...rowConstraints, ...colConstraints, ...areaConstraints]
    }

    public static createBasicSudoku(): Sudoku {
        const nRows = 9
        const nCols = 9

        const constraints = SudokuFactory.getBasicConstraints(nRows, nCols)
        return new Sudoku(nRows, nCols, constraints);
    }

    public static createNRCSudoku(): Sudoku {
        const nRows = 9
        const nCols = 9

        const constraints = SudokuFactory.getBasicConstraints(nRows, nCols)
        const subConstraints = SudokuFactory.getAreaConstraints([1, 5])
        return new Sudoku(nRows, nCols, [...constraints, ...subConstraints]);
    }

    public static fillNRCSudoku(sudoku: Sudoku) {
        [
            [1, 0, 2],
            [1, 3, 4],
            [1, 4, 6],
            [1, 8, 5],
            [2, 8, 9],
            [3, 1, 1],
            [3, 5, 7],
            [5, 1, 9],
            [5, 5, 2],
            [5, 6, 5],
            [6, 2, 3],
            [7, 3, 6],
            [7, 5, 1],
            [7, 6, 4],
            [8, 3, 8]
        ].forEach(([row, col, value]) =>
            sudoku.setValue({row, col}, value));
    }

    public static fillBasicSudoku(sudoku: Sudoku) {
        [
            [0, 2, 3],
            [0, 4, 1],
            [0, 6, 5],
            [1, 5, 9],
            [1, 7, 7],
            [1, 8, 6],
            [2, 0, 6],
            [2, 3, 7],
            [2, 5, 5],
            [2, 8, 1],
            [3, 4, 4],
            [3, 6, 8],
            [4, 1, 7],
            [4, 6, 4],
            [4, 8, 2],
            [5, 0, 9],
            [5, 1, 1],
            [5, 7, 6],
            [6, 2, 9],
            [6, 5, 8],
            [6, 6, 1],
            [6, 8, 4],
            [7, 6, 6],
            [8, 0, 5],
            [8, 4, 2],
            [8, 7, 9],
            [8, 8, 7],
        ].forEach(([row, col, value]) =>
            sudoku.setValue({row, col}, value));
    }


}

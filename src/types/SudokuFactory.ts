import { Sudoku } from "./Sudoku"
import { range } from "../utils"
import { SudokuAreaConstraint, SudokuColumnConstraint, SudokuConstraint, SudokuRowConstraint } from "./SudokuConstraint"
import { SudokuVariant } from "./SudokuVariants"
import { ImportDataItem, SudokuImport } from "./SudokuImport"

export class SudokuFactory {
    private static _data: {[dataURL: string]: SudokuImport} = {}

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

    public static create(variant: SudokuVariant) {
        return variant.create()
    }

    public static async dataIds(variant: SudokuVariant): Promise<string[]> {
        const importer = await SudokuFactory.loadData(variant.dataURL)
        return importer.ids
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

    private static async fillSudoku(sudoku: Sudoku, dataURL: string, id: string) {
        const importer = await SudokuFactory.loadData(dataURL)
        const importDataItems = importer.getData(id)
        SudokuFactory.fillData(sudoku, importDataItems)
    }

    public static fillData(sudoku: Sudoku, importDataItems: ImportDataItem[]) {
        // Clear any existing values
        for (let index of sudoku.indexes) {
            sudoku.setValue(index, null)
        }

        // Fill with new data
        for (let [row, col, value] of importDataItems) {
            sudoku.setValue({row, col}, value);
        }
    }

    private static async loadData(dataURL: string): Promise<SudokuImport> {
        if (!SudokuFactory._data[dataURL]) {
            const importer = new SudokuImport(dataURL)
            await importer.setup
            SudokuFactory._data[dataURL] = importer
        }
        return SudokuFactory._data[dataURL]
    }

    public static async fillNRCSudoku(sudoku: Sudoku, id: string = "default") {
        await SudokuFactory.fillSudoku(sudoku, "/data/nrc.json", id)
    }

    public static async fillBasicSudoku(sudoku: Sudoku, id: string = "default") {
        await SudokuFactory.fillSudoku(sudoku, "/data/basic.json", id)
    }
}
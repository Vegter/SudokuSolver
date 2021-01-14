import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuValue } from "./SudokuCell"
import { strategyMapping } from "../config"

export class SudokuIndexInfo {
    private _allowedValues: SudokuValue[]

    constructor(allowedValues: SudokuValue[]) {
        this._allowedValues = allowedValues
    }

    get allowedValues() {
        return this._allowedValues
    }

    set allowedValues(values) {
        this._allowedValues = values
    }
}

type Hint = [SudokuIndex, SudokuValue]

export class SudokuHelper {
    readonly sudoku: Sudoku
    readonly indexInfo: {
        [key: string]: SudokuIndexInfo
    } = {}
    private sudokuChecksum: number

    constructor(sudoku: Sudoku) {
        this.sudoku = sudoku
        this.sudokuChecksum = -1
        this.prepare()
    }

    private prepare() {
        if (this.sudokuChecksum !== this.sudoku.checksum) {
            this.sudoku.indexes.forEach(index => {
                const value = this.sudoku.getValue(index)
                const allowedValues = value === null ? this.sudoku.allowedValues(index) : []
                const indexInfo = new SudokuIndexInfo(allowedValues)
                this.indexInfo[index.id] = indexInfo
            })
            this.sudokuChecksum = this.sudoku.checksum
        }
    }

    get strategies() {
        return strategyMapping((strategy, config) =>
            config.create(this))
    }

    public getHint(): Hint | undefined {
        this.prepare()

        const strategies = Object.values(this.strategies)

        let strategy = 0
        do {
            for (let index of this.sudoku.indexes) {
                const info = this.indexInfo[index.id]
                if (info.allowedValues.length === 1) {
                    return [index, info.allowedValues[0]]
                }
            }

            for (let index of this.sudoku.indexes) {
                const actions = strategies[strategy].process(index)
                for (let action of actions) {
                    const info = this.indexInfo[action.index.id]
                    info.allowedValues = action.allowedValues
                }
            }

            strategy += 1
        } while (strategies[strategy])
    }

    public applyHint([index, value]: Hint) {
        this.sudoku.setValue(index, value)
    }

    public mandatoryValue(index: SudokuIndex): SudokuValue {
        if (this.indexInfo[index.id]) {
            const allowedValues = this.indexInfo[index.id].allowedValues
            if (allowedValues.length === 1) {
                return allowedValues[0]
            }
        }
        return null
    }

    public allowedValues(index: SudokuIndex) {
        return this.indexInfo[index.id].allowedValues
    }
}

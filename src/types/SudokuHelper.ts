import { Sudoku, SudokuIndex } from "./Sudoku"
import { SudokuValue } from "./SudokuCell"
import { strategyMapping } from "../config"
import { SudokuAction } from "./SudokuStrategies/SudokuAction"
import { SudokuStrategy } from "./SudokuStrategies/SudokuStrategy"
import assert from "assert"

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

type IndexActions = {[key: string]: SudokuAction[]}

export class SudokuHelper {
    readonly sudoku: Sudoku
    readonly indexInfo: {
        [key: string]: SudokuIndexInfo
    } = {}
    private sudokuChecksum: number
    private _actions: IndexActions | null = null

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

    get actions(): IndexActions {
        if (this._actions === null || this.sudokuChecksum !== this.sudoku.checksum) {
            this.refreshActions()
        }
        assert(this._actions !== null)
        return this._actions
    }

    private refreshActions() {
        this._actions = this.getActions()
    }

    private getActions(strategy: SudokuStrategy | null = null): IndexActions {
        this.prepare()

        const strategies = strategy === null ? this.strategies : [strategy]
        const actions: IndexActions = {}
        Object.values(strategies).forEach(strategy => {
            this.sudoku.indexes.forEach(index => {
                strategy.process(index).forEach(action => {
                    actions[action.index.id] = actions[action.index.id] || []
                    actions[action.index.id].push(action)
                })
            })
        })
        return actions
    }

    public applyActions(actions: SudokuAction[]) {
        actions.forEach(action => {
            const info = this.indexInfo[action.index.id]
            info.allowedValues = action.allowedValues
            this._actions = null    // actions needs refresh
        })
    }

    public getHint(): Hint | undefined {
        this.prepare()

        const strategies = Object.values(this.strategies)

        let actionsApplied = true
        while (actionsApplied) {
            actionsApplied = false
            for (let strategy of strategies) {
                for (let index of this.sudoku.indexes) {
                    const info = this.indexInfo[index.id]
                    if (info.allowedValues.length === 1) {
                        return [index, info.allowedValues[0]]
                    }
                }

                for (let actions of Object.values(this.getActions(strategy))) {
                    this.applyActions(actions)
                    actionsApplied = true
                }
            }
        }
    }

    public applyHint([index, value]: Hint) {
        this.sudoku.setValue(index, value)
    }

    public allowedValues(index: SudokuIndex) {
        return this.indexInfo[index.id].allowedValues
    }
}

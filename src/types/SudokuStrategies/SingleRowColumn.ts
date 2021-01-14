import { SudokuIndex } from "../Sudoku"
import {
    SudokuAreaConstraint,
    SudokuColumnConstraint,
    SudokuConstraint,
    SudokuRowConstraint
} from "../SudokuConstraint"
import { SudokuValue } from "../SudokuCell"
import { SudokuStrategy } from "./SudokuStrategy"
import { SudokuAction } from "./SudokuAction"

type ValuesResult = [SudokuValue, SudokuConstraint, number | null, number | null]

export class SingleRowColumn extends SudokuStrategy {
    public values(index: SudokuIndex): SudokuValue[] {
        return this.getValues(index).map(([value, constraint, row, column]: ValuesResult) => value)
    }

    private getValues(index: SudokuIndex): ValuesResult[] {
        const info = this.indexInfo[index.id]
        const applicableConstraints = this.sudoku.constraints
            .filter(c => c.appliesTo(index))
            .filter(constraint => constraint instanceof SudokuAreaConstraint)

        let result: ValuesResult[] = []
        for (let value of info.allowedValues) {
            // Try finding a value with all possible values on one row or one column
            for (let constraint of applicableConstraints) {
                let rows = new Set<number>()
                let cols = new Set<number>()
                for (let constraintIndex of constraint.constraintIndexes(this.sudoku)) {
                    if (this.indexInfo[constraintIndex.id].allowedValues.includes(value)) {
                        rows.add(constraintIndex.row)
                        cols.add(constraintIndex.col)
                    }
                }
                if (rows.size === 1 || cols.size === 1) {
                    result.push([value, constraint, rows.size === 1 ? index.row : null, cols.size === 1 ? index.col : null])
                }
            }
        }
        return result
    }

    public process(index: SudokuIndex): SudokuAction[] {
        const values = this.getValues(index)
        return values.reduce((actions: SudokuAction[],
                              [value, constraint, row, column]: ValuesResult) => {
            return actions.concat(this.action(constraint,
                index,
                value,
                row,
                column))
        }, [] as SudokuAction[])
    }

    private action(constraint: SudokuConstraint,
                   index: SudokuIndex,
                   value: SudokuValue,
                   row: number | null,
                   col: number | null): SudokuAction[] {
        let rowColumnConstraints: SudokuConstraint[] = []
        if (row !== null) {
            rowColumnConstraints = this.sudoku.constraints
                .filter(c => c.appliesTo(index) && c instanceof SudokuRowConstraint && c.firstRow === row)
        } else if (col !== null) {
            rowColumnConstraints = this.sudoku.constraints
                .filter(c => c.appliesTo(index) && c instanceof SudokuColumnConstraint && c.firstCol === col)
        }

        const result: SudokuAction[] = []
        for (let rowColumnConstraint of rowColumnConstraints) {
            for (let rowColumnIndex of rowColumnConstraint.constraintIndexes(this.sudoku).filter(i => !constraint.appliesTo(i))) {
                const allowedValues = this.indexInfo[rowColumnIndex.id].allowedValues
                if (allowedValues.includes(value)) {
                    result.push({
                        motivation: `${value} is a single row/column value`,
                        constraints: [constraint, rowColumnConstraint],
                        allowedValues: allowedValues.filter(v => v !== value),
                        index: rowColumnIndex
                    })
                }
            }
        }
        return result
    }
}

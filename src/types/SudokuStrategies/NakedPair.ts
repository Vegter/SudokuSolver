import { SudokuIndex } from "../Sudoku"
import { SudokuConstraint } from "../SudokuConstraint"
import { SudokuValue } from "../SudokuCell"
import { SudokuStrategy } from "./SudokuStrategy"
import { SudokuAction } from "./SudokuAction"

type ValuesResult = [SudokuConstraint, SudokuIndex[], SudokuValue[]]

export class NakedPair extends SudokuStrategy {
    public values(index: SudokuIndex): SudokuValue[] {
        const values = this.getValues(index)
        return Array.from(
            values.reduce((result: Set<SudokuValue>,
                           [constraint, indexes, allowedValues]: ValuesResult) => {
                allowedValues.forEach(v => result.add(v))
                return result
            }, new Set<SudokuValue>())
        )
    }

    private getValues(index: SudokuIndex): ValuesResult[] {
        const info = this.indexInfo[index.id]
        const allowedValues = info.allowedValues

        // Pairs within a constraint with identical allowed value is not possible
        if (allowedValues.length === 1) {
            return []
        }

        // Find any applicable constraints
        const applicableConstraints = this.sudoku.constraints.filter(c => c.appliesTo(index))

        let result: ValuesResult[] = []
        for (let constraint of applicableConstraints) {
            const identicalIndexes = constraint.constraintIndexes(this.sudoku)
                .filter(i => allowedValues.join('') === this.indexInfo[i.id].allowedValues.join(''))
            // A pair is a set of indexes with identical values, eg [[x, y] [x, y]] or [[x, y, z] [x, y, z]]
            if (identicalIndexes.length === allowedValues.length) {
                // n pairs with identical n values
                result.push([constraint, identicalIndexes, allowedValues])
            }
        }
        return result
    }

    public process(index: SudokuIndex): SudokuAction[] {
        const values = this.getValues(index)
        return values.reduce((result: SudokuAction[], [constraint, indexes, allowedValues]: ValuesResult) => {
            return result.concat(this.action(constraint, indexes, allowedValues))
        }, [] as SudokuAction[])
    }

    private action(constraint: SudokuConstraint,
                   identicalIndexes: SudokuIndex[],
                   values: SudokuValue[]): SudokuAction[] {
        const identicalIds = identicalIndexes.map(i => i.id)
        const otherIndexes = constraint.constraintIndexes(this.sudoku)
            .filter(i => !identicalIds.includes(i.id))
        const actions: SudokuAction[] = []
        otherIndexes.forEach(i => {
            const info = this.indexInfo[i.id]
            const eliminateValues = info.allowedValues.filter(v => values.includes(v))
            if (eliminateValues.length > 0) {
                const allowedValues = info.allowedValues.filter(v => !values.includes(v))
                actions.push({
                    motivation: `Eliminate naked pair values ${eliminateValues.join(", ")}`,
                    constraints: [constraint],
                    index: i,
                    allowedValues: allowedValues
                })
            }
        })
        return actions
    }
}

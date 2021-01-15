import { SudokuIndex } from "../Sudoku"
import { SudokuConstraint } from "../SudokuConstraint"
import { SudokuValue } from "../SudokuCell"
import { SudokuStrategy } from "./SudokuStrategy"
import { SudokuAction } from "./SudokuAction"

type ValuesResult = [SudokuValue, SudokuConstraint[]]

export class MandatoryValue extends SudokuStrategy {
    public values(index: SudokuIndex): SudokuValue[] {
        const mandatoryValue = this.getValues(index)[0]
        return mandatoryValue ? [mandatoryValue] : []
    }

    private getValues(index: SudokuIndex): ValuesResult {
        const info = this.indexInfo[index.id]
        const applicableConstraints = this.sudoku.constraints.filter(c => c.appliesTo(index))

        let mandatoryValue: SudokuValue = null
        let constraints: SudokuConstraint[] = []

        if (info.allowedValues.length === 1) {
            return [info.allowedValues[0], []]
        }
        for (let value of info.allowedValues) {
            // Try finding a value with only one possible index within a constraint
            for (let constraint of applicableConstraints) {
                let nPossibilities = 0
                for (let constraintIndex of constraint.constraintIndexes(this.sudoku)) {
                    if (this.indexInfo[constraintIndex.id].allowedValues.includes(value)) {
                        nPossibilities += 1
                        if (nPossibilities > 1) {
                            // Stop searching this constraint as it allows for multiple indexes for the given value
                            break;
                        }
                    }
                }
                if (nPossibilities === 1) {
                    mandatoryValue = value
                    constraints.push(constraint)
                }
            }
        }
        return [mandatoryValue, constraints]
    }

    public process(index: SudokuIndex): SudokuAction[] {
        const [mandatoryValue, constraints] = this.getValues(index)
        return mandatoryValue === null ? [] : [this.action(constraints, index, mandatoryValue)]
    }

    private action(constraints: SudokuConstraint[], index: SudokuIndex, value: SudokuValue) {
        return {
            motivation: `Value ${value} is the only possible value in this constraint`,
            index,
            constraints,
            allowedValues: [value]
        }
    }
}

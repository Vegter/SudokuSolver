import { SudokuIndex } from "../Sudoku"
import { SudokuConstraint } from "../SudokuConstraint"
import { SudokuValue } from "../SudokuCell"
import { SudokuStrategy } from "./SudokuStrategy"
import { getAllSubsets } from "../../utils"
import { SudokuAction } from "./SudokuAction"

type ValuesResult = [SudokuConstraint, SudokuIndex, SudokuValue[], SudokuIndex[]]

export class HiddenPair extends SudokuStrategy {
    public values(index: SudokuIndex): SudokuValue[] {
        const values = this.getValues(index)
        return Array.from(
            values.reduce((result: Set<SudokuValue>,
                           [constraint, index, subset, identicalIndexes]: ValuesResult) => {
                subset.forEach(v => result.add(v))
                return result
            }, new Set<SudokuValue>())
        )
    }

    private getValues(index: SudokuIndex): ValuesResult[] {
        const allowedValues = this.indexInfo[index.id].allowedValues

        // Pairs within a constraint with identical allowed values is not possible
        if (allowedValues.length === 1) {
            return []
        }

        // Search for subsets of a minimum length of 2 and less than the length of the allowed values
        // Length 1 cannot result in a usable set
        const subsets = getAllSubsets(allowedValues)
            .filter((set: SudokuValue[]) => 2 <= set.length && set.length <= allowedValues.length)

        // Find any applicable constraints
        const constraints = this.sudoku.constraints
            .filter(c => c.appliesTo(index))

        let result: ValuesResult[] = []
        for (let subset of subsets) {
            // Check every subset
            for (let constraint of constraints) {
                // Find all indexes that contain this subset
                const identicalIndexes = constraint.constraintIndexes(this.sudoku)
                    .filter(i => {
                        for (let n of subset) {
                            if (!this.indexInfo[i.id].allowedValues.includes(n)) return false
                        }
                        return true
                    })
                if (identicalIndexes.length !== subset.length) {
                    continue
                }

                // Find all indexes that don't contain any of the subset
                const inIndexes = constraint.constraintIndexes(this.sudoku)
                    .filter(i => {
                        for (let n of subset) {
                            if (this.indexInfo[i.id].allowedValues.includes(n)) return true
                        }
                        return false
                    })
                if (identicalIndexes.length !== inIndexes.length) {
                    continue
                }

                result.push([constraint, index, subset, identicalIndexes])
            }
        }
        return result
    }

    public process(index: SudokuIndex): SudokuAction[] {
        const values = this.getValues(index)
        return values.reduce((result: SudokuAction[],
                              [constraint, index, subset, identicalIndexes]: ValuesResult) => {
                result.concat(this.action(constraint, index, subset, identicalIndexes))
                return result
            }, [] as SudokuAction[])
    }

    private action(constraint: SudokuConstraint,
                   index: SudokuIndex,
                   values: SudokuValue[],
                   identicalIndexes: SudokuIndex[]): SudokuAction[] {
        const result: SudokuAction[] = []
        identicalIndexes.forEach(i => {
            const allowedValues = this.indexInfo[i.id].allowedValues
            if (allowedValues.length !== values.length) {
                result.push({
                    motivation: "Hidden pair",
                    constraints: [constraint],
                    index: i,
                    allowedValues: values

                })
            }
        })
        return result
    }


}

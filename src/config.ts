import { SudokuVariants } from "./types/SudokuVariants"
import { strategyMapping, SudokuStrategyKeys } from "./types/SudokuStrategies"

export type { SudokuStrategyKeys } from "./types/SudokuStrategies"
export { SudokuStrategies, strategyMapping } from "./types/SudokuStrategies"

export type SudokuOptionKeys = "PossibleValues" |
    "Hint" |
    SudokuStrategyKeys

export type SudokuOptions = Record<SudokuOptionKeys, boolean>

const DefaultOptions: SudokuOptions = {
    PossibleValues: false,
    Hint: false,
    ...strategyMapping(() => false)
}

export const Default = {
    sudokuVariant: SudokuVariants.Basic,
    options: DefaultOptions
}

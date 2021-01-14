import { HiddenPair } from "./HiddenPair"
import { MandatoryValue } from "./MandatoryValue"
import { SingleRowColumn } from "./SingleRowColumn"
import { NakedPair } from "./NakedPair"
import { SudokuHelper } from "../SudokuHelper"
import { SudokuStrategy } from "./SudokuStrategy"

export interface SudokuStrategyConfig {
    create: (helper: SudokuHelper) => SudokuStrategy,
    option: {
        text: string
    },
    style: {
        color: string
    }
}

interface ISudokuStrategies {
    MandatoryValue: SudokuStrategyConfig
    SingleRowColumn: SudokuStrategyConfig
    NakedPair: SudokuStrategyConfig
    HiddenPair: SudokuStrategyConfig
}

export type SudokuStrategyKeys = keyof ISudokuStrategies

export function strategyMapping<T>(mapping: (strategy: SudokuStrategyKeys, config: SudokuStrategyConfig) => T) {
    return Object.entries(SudokuStrategies).reduce((result, [key, config]) => {
        const strategy = key as SudokuStrategyKeys
        result[strategy] = mapping(strategy as SudokuStrategyKeys, config)
        return result
    }, {} as Record<SudokuStrategyKeys, T>)
}

export const SudokuStrategies: ISudokuStrategies = {
    MandatoryValue: {
        create: (helper: SudokuHelper) => new MandatoryValue(helper),
        option: {
            text: "Show mandatory values"
        },
        style: {
            color: "purple"
        }
    },
    NakedPair: {
        create: (helper: SudokuHelper) => new NakedPair(helper),
        option: {
            text: "Show pairs"
        },
        style: {
            color: "red"
        }
    },
    HiddenPair: {
        create: (helper: SudokuHelper) => new HiddenPair(helper),
        option: {
            text: "Show hidden pairs"
        },
        style: {
            color: "blue"
        }
    },
    SingleRowColumn: {
        create: (helper: SudokuHelper) => new SingleRowColumn(helper),
        option: {
            text: "Show single row/column"
        },
        style: {
            color: "green"
        }
    }
}

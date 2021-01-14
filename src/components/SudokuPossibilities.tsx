import React from 'react'
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuCell, SudokuValue } from "../types/SudokuCell"
import { SudokuOptions, SudokuStrategyKeys, strategyMapping } from "../config"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        possibleValues: {
            position: "absolute",
            top: 0,
            left: 0,
            textAlign: "left",
            marginLeft: "2px",
            fontSize: "10px",
            fontFamily: "monospace"
        },
        possibleValue: {},
        ...strategyMapping((strategy, config) => config.style)
    }),
);

export interface SudokuPossibilitiesProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    options: SudokuOptions,
    index: SudokuIndex
}

function SudokuPossibilities(props: SudokuPossibilitiesProps) {
    const classes = useStyles();
    const { sudoku, sudokuHelper, options, index } = props
    const value = sudoku.getValue(index)

    // Check is any option is selected
    const anyOptionSelected = Object.values(options)
        .reduce((result: boolean, option: boolean) => result || option, false)

    if (value !== null || !anyOptionSelected) {
        // Nothing for existing values or when filtered out by options
        return null
    }

    const strategies = sudokuHelper.strategies
    const strategyValues = strategyMapping((strategy, config) =>
        strategies[strategy].values(index))

    let values: SudokuValue[] = []
    if (options.PossibleValues) {
        values = sudokuHelper.allowedValues(index)
    } else {
        values = Array.from(
            Object.entries(strategyValues).reduce((result, [key, values]) => {
                if (options[key as SudokuStrategyKeys]) {
                    values.forEach(v => result.add(v))
                }
                return result
            }, new Set<SudokuValue>()))
    }

    if (values.length === 0) {
        // Nothing to show
        return null
    }

    const displayValues = SudokuCell.ValidValues.map(v => {
        return values.includes(v) ? v : " "
    })
    const lines = [0, 3, 6].map(n => displayValues.slice(n, n + 3))

    return (
        <div className={classes.possibleValues}>
            {lines.map((line, i) => <div key={i}>
                {line.map((c, i) => {
                    if (c === " ") {
                        return <span key={i}>&nbsp;</span>
                    } else {
                        let classNames = [classes.possibleValue]
                        Object.entries(strategyValues).forEach(([key, value]) => {
                            const strategy = key as SudokuStrategyKeys
                            if (options[strategy] && strategyValues[strategy].includes(c)) {
                                classNames.push(classes[strategy])
                            }
                        })
                        return <span key={i} className={classNames.join(' ')}>{c}</span>
                    }
                })}
            </div>)}
        </div>
    )
}

export default SudokuPossibilities
import React from 'react'
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuCell, SudokuValue } from "../types/SudokuCell"
import { SudokuOptions } from "../config"

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
        possibleValue: {
        },
        singleRowColumnValue: {
            color: "green"
        },
        pairValues: {
            color: "red",
        },
        hiddenPairValues: {
            color: "blue"
        }
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

    const {showPossibleValues, showPairs, showSingleRowColumnValues, showHiddenPairs} = options

    if (value !== null || !(showPossibleValues || showPairs || showSingleRowColumnValues || showHiddenPairs)) {
        // Nothing for existing values or when filtered out by options
        return null
    }

    const possibleValues = sudokuHelper.allowedValues(index)
    const singleRowColumnValues = sudokuHelper.singleRowColumnValues(index)
    const isPair = sudokuHelper.pairs(index).length > 0
    const hiddenPairs = sudokuHelper.hiddenPairs(index)
    const isHiddenPair = hiddenPairs.length > 0

    let values: SudokuValue[] = []
    if (showPossibleValues) {
        values = possibleValues
    } else {
        if (showPairs && isPair) {
            values = possibleValues
        } else if (showHiddenPairs && isHiddenPair) {
            values = hiddenPairs
            // hiddenPairs.forEach(pair => {
            //     pair.forEach((v: number) => values.push(v))
            // }
        } else if (showSingleRowColumnValues) {
            values = singleRowColumnValues
        }
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
                        let className = classes.possibleValue
                        if (showPairs && isPair) {
                            className = classes.pairValues
                        }
                        if (showHiddenPairs && isHiddenPair) {
                            className = classes.hiddenPairValues
                        }
                        if (showSingleRowColumnValues && singleRowColumnValues.includes(c)) {
                            className = classes.singleRowColumnValue
                        }
                        return <span key={i} className={className}>{c}</span>
                    }
                })}
            </div>)}
        </div>
    )
}

export default SudokuPossibilities
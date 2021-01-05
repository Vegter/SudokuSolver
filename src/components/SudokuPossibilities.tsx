import React from 'react'
import { Sudoku } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuValue } from "../types/SudokuValue"
import { SudokuOptions } from "../types/SudokuOptions"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        possibleValues: {
            position: "absolute",
            top: 0,
            left: 0,
            textAlign: "left",
            marginLeft: "2px",
            fontSize: "8px",
            fontFamily: "monospace"
        }
    }),
);

export interface SudokuPossibilitiesProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    options: SudokuOptions,
    row: number,
    col: number,
}

function SudokuPossibilities(props: SudokuPossibilitiesProps) {
    const classes = useStyles();
    const { sudoku, sudokuHelper, options, row, col } = props
    const index = {row, col}
    const value = sudoku.getValue(index)

    if (value !== null || !options.showPossibleValues) {
        // Nothing for existing values
        return null
    }
    const allowedValues = sudokuHelper.allowedValues(index)

    const displayValues = SudokuValue.ValidValues.map(v => {
        return allowedValues.includes(v) ? v : " "
    }).join("")
    const lines = [0, 3, 6].map(n => displayValues.substr(n, 3))

    return (
        <div className={classes.possibleValues}>
            {lines.map(line => <div>
                {line.replace(/ /g, "\u00a0")}
            </div>)}
        </div>
    )
}

export default SudokuPossibilities
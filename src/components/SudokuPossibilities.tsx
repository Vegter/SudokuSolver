import React from 'react'
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuCell } from "../types/SudokuCell"
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

    if (value !== null || !options.showPossibleValues) {
        // Nothing for existing values
        return null
    }
    const allowedValues = sudokuHelper.allowedValues(index)

    const displayValues = SudokuCell.ValidValues.map(v => {
        return allowedValues.includes(v) ? v : " "
    }).join("")
    const lines = [0, 3, 6].map(n => displayValues.substr(n, 3))

    return (
        <div className={classes.possibleValues}>
            {lines.map((line, i) => <div key={i}>
                {line.replace(/ /g, "\u00a0")}
            </div>)}
        </div>
    )
}

export default SudokuPossibilities
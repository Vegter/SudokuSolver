import React from 'react'
import { Sudoku } from "../types/Sudoku"
import { makeStyles } from "@material-ui/core/styles"
import { SudokuConstraint } from "../types/SudokuConstraint"
import { SudokuHelper } from "../types/SudokuHelper"

const useStyles = makeStyles({
    root: {
        fontSize: "9px"
    },
});

export interface SudokuHintProps {
    sudoku: Sudoku,
    helper: SudokuHelper,
    row: number,
    col: number
}

function SudokuHint(props: SudokuHintProps) {
    const classes = useStyles();
    const { sudoku, row, col, helper } = props
    const value = sudoku.contents[row][col]

    if (value !== null) {
        return null
    }

    const highlightStyle = {
        color: "red"
    }

    const foundStyle = {
        color: "green"
    }

    const hints = helper.hints[row][col]
    const isSpecial = helper.isSinglePossibility(row, col)
    const highlight = hints.length === 1 || isSpecial
    const attention = isSpecial.includes("possibility") ? "!" : ""

    return (
        <div className={classes.root}>
            {hints.map(v => {
                const style = attention ? foundStyle : highlight ? highlightStyle : {}
                return (
                    <span key={v} title={isSpecial} style={style}>
                    {v}
                    </span>
                )
            })}
        </div>
    )
}

export default SudokuHint
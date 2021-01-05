import React from 'react'
import { Sudoku } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { TSudokuValue } from "../types/SudokuValue"
import { IconButton } from "@material-ui/core"
import { SudokuOptions } from "../types/SudokuOptions"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: "9px"
        },
        button: {
        },
        possibleValues: {
            float: "left"
        }
    }),
);

export interface SudokuHintProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    options: SudokuOptions,
    row: number,
    col: number,
    onChange: (row: number, col: number, value: TSudokuValue) => TSudokuValue
}

function SudokuHint(props: SudokuHintProps) {
    const classes = useStyles();
    const { sudoku, sudokuHelper, options, row, col } = props
    const index = {row, col}
    const value = sudoku.getValue(index)

    const mandatoryValue = sudokuHelper.mandatoryValue(index)

    if (value !== null || !options.showHint || mandatoryValue === null) {
        // Nothing for existing values
        return null
    }

    const onProposalClick = (proposal:number) => {
        props.onChange(row, col, proposal)
    }

    return (
        <IconButton
            className={classes.button}
            size={"small"}
            color={"secondary"}
            onClick={() => onProposalClick(mandatoryValue)}>
            ?
        </IconButton>
    )
}

export default SudokuHint
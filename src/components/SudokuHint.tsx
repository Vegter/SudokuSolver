import React from 'react'
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuValue } from "../types/SudokuCell"
import { IconButton } from "@material-ui/core"
import { SudokuOptions } from "../config"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            top: 7,
            left: 8,
            textAlign: "center",
            marginLeft: "2px",
        },
    }),
);

export interface SudokuHintProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    options: SudokuOptions,
    index: SudokuIndex
    onChange: (index: SudokuIndex, value: SudokuValue) => SudokuValue
}

function SudokuHint(props: SudokuHintProps) {
    const classes = useStyles();
    const { sudoku, sudokuHelper, options, index } = props
    const value = sudoku.getValue(index)

    const mandatoryValue = sudokuHelper.mandatoryValue(index)

    if (value !== null || !options.Hint || mandatoryValue === null) {
        // Nothing for existing values
        return null
    }

    const onProposalClick = (proposal:number) => {
        props.onChange(index, proposal)
    }

    return (
        <IconButton
            className={classes.root}
            size={"small"}
            color={"secondary"}
            onClick={() => onProposalClick(mandatoryValue)}>
            ?
        </IconButton>
    )
}

export default SudokuHint
import React from 'react'
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SudokuHelper } from "../types/SudokuHelper"
import { IconButton } from "@material-ui/core"
import { SudokuOptions } from "../config"
import { SudokuAction } from "../types/SudokuStrategies/SudokuAction"

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

export interface SudokuActionProposalProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    options: SudokuOptions,
    index: SudokuIndex
    onAction: (actions: SudokuAction[]) => void
}

function SudokuActionProposal(props: SudokuActionProposalProps) {
    const classes = useStyles();
    const { sudoku, sudokuHelper, options, index } = props
    const value = sudoku.getValue(index)

    const allowedValues = sudokuHelper.allowedValues(index)
    const actionProposals = sudokuHelper.actions[index.id] || []

    if (value !== null || !options.Hint || allowedValues.length === 1 || actionProposals.length === 0) {
        // Nothing for existing values
        return null
    }

    const title = Array.from(new Set(actionProposals.map(proposal => proposal.motivation))).join(', ')

    const onProposalClick = (actions: SudokuAction[]) => {
        props.onAction(actions)
    }

    return (
        <IconButton
            className={classes.root}
            size={"small"}
            color={"secondary"}
            onClick={() => onProposalClick(actionProposals)}
            title={title}>
            !
        </IconButton>
    )
}

export default SudokuActionProposal
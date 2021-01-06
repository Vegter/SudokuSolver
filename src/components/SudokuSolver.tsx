import React from 'react'
import { Button } from "@material-ui/core"
import BuildIcon from '@material-ui/icons/Build'
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuValue } from "../types/SudokuCell"

export interface SudokuSolverProps {
    sudokuHelper: SudokuHelper,
    onChange: (row: number, col: number, value: SudokuValue) => SudokuValue
}

function SudokuSolver(props: SudokuSolverProps) {
    const {sudokuHelper, onChange} = props

    const solve = () => {
        const hint = sudokuHelper.getHint()
        if (hint) {
            const [{row, col}, value] = hint
            onChange(row, col, value)
            setTimeout(() => solve(), 0)
        }
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            onClick={solve}
        >
            Solve
        </Button>
    )
}

export default SudokuSolver
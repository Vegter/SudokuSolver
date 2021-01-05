import React from 'react'
import { Button } from "@material-ui/core"
import BuildIcon from '@material-ui/icons/Build'
import { Sudoku } from "../types/Sudoku"
import { SudokuHelper } from "../types/SudokuHelper"
import { TSudokuValue } from "../types/SudokuValue"

export interface SudokuSolverProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper,
    onChange: (row: number, col: number, value: TSudokuValue) => TSudokuValue
}


function SudokuSolver(props: SudokuSolverProps) {
    const {sudoku, sudokuHelper, onChange} = props

    const applyHint = (sudoku: Sudoku, helper: SudokuHelper) => {
        for (let row of sudoku.rowIndexes) {
            for (let col of sudoku.colIndexes) {
                const index = {row, col}
                const mandatoryValue = helper.mandatoryValue(index)
                if (sudoku.getValue(index) === null && mandatoryValue !== null) {
                    onChange(row, col, mandatoryValue)
                    return true
                }
            }
        }
        return false
    }

    const solve = () => {
        if (applyHint(sudoku, sudokuHelper)) {
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
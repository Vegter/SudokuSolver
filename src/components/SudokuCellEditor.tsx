import React, { ChangeEvent, useState } from 'react'

import { Input } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Sudoku, SudokuIndex } from "../types/Sudoku"
import { SudokuValue } from "../types/SudokuCell"
import { SudokuOptions } from "../config"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            '& > *': {
                textAlign: "center",
            },
        }
    }),
);

export interface SudokuCellEditorProps {
    sudoku: Sudoku,
    sudokuOptions: SudokuOptions,
    index: SudokuIndex,
    onChange: (index: SudokuIndex, value: SudokuValue) => SudokuValue
}

export default function SudokuCellEditor(props: SudokuCellEditorProps) {
    const classes = useStyles();

    const { sudoku, sudokuOptions, index } = props

    const [value, setValue] = useState(sudoku.getValue(index) || "")

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue: SudokuValue = Number(event.target.value)
        const value = props.onChange(index, isNaN(newValue) ? null : newValue)
        setValue(value || "")
    }

    if (sudokuOptions.showHint && !value) {
        return null
    }

    return (
        <form noValidate autoComplete="off">
            <Input className={classes.textField} disableUnderline={true}
                   value={value}
                   onChange={onChange}/>
        </form>
    );
}

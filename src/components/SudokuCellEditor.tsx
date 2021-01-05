import React, { ChangeEvent, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Input } from "@material-ui/core"
import { Sudoku } from "../types/Sudoku"
import { TSudokuValue } from "../types/SudokuValue"
import { SudokuOptions } from "../types/SudokuOptions"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        textField: {
            '& > *': {
                textAlign: "center",
            },
        }
    }),
);

export interface SudokuCellEditorProps {
    sudoku: Sudoku,
    options: SudokuOptions,
    row: number,
    col: number,
    onChange: (row: number, col: number, value: TSudokuValue) => TSudokuValue
}

export default function SudokuCellEditor(props: SudokuCellEditorProps) {
    const { sudoku, options, row, col } = props

    const classes = useStyles();
    const [value, setValue] = useState(sudoku.getValue({row, col}) || "")

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue: TSudokuValue = Number(event.target.value)
        const value = props.onChange(row, col, isNaN(newValue) ? null : newValue)
        setValue(value || "")
    }

    if (options.showHint && !value) {
        return null
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Input className={classes.textField} disableUnderline={true}
                   value={value}
                   onChange={onChange}/>
        </form>
    );
}

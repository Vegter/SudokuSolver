import React, { ChangeEvent, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Input } from "@material-ui/core"
import { Sudoku } from "../types/Sudoku"

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
    row: number,
    col: number,
    onChange: () => void
}

export default function SudokuCellEditor(props: SudokuCellEditorProps) {
    const { sudoku, row, col } = props

    const classes = useStyles();
    const [value, setValue] = useState(sudoku.contents[row][col] || "")

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let newValue = Number(event.target.value)
        if (isNaN(newValue)) {
            setValue("")
        } else {
            newValue = newValue % 10
            if (1 <= newValue && newValue <= 9) {
                sudoku.contents[row][col] = newValue
                setValue(newValue)
            } else {
                sudoku.contents[row][col] = null
                setValue("")
            }
        }
        props.onChange()
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Input className={classes.textField} disableUnderline={true}
                   value={value}
                   onChange={onChange}/>
        </form>
    );
}

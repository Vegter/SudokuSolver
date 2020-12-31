import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Sudoku } from "../types/Sudoku"
import SudokuCellEditor from "./SudokuCellEditor"
import SudokuHint from "./SudokuHint"
import { SudokuConstraint } from "../types/SudokuConstraint"
import { SudokuHelper } from "../types/SudokuHelper"

export interface SudokuEditorProps {
    sudoku: Sudoku,
    sudokuHelper: SudokuHelper
}

const CELL_WIDTH = 40
const CELL_HEIGHT = 40

export function SudokuEditor(props:SudokuEditorProps) {
    const [change, setChange] = useState(0)

    const sudoku = props.sudoku
    const helper = props.sudokuHelper

    const useStyles = makeStyles({
        table: {
            border: "1px solid black",
            borderSpacing: 0,
            width: sudoku.nCols * CELL_WIDTH,
            height: sudoku.nRows * CELL_HEIGHT
        },
        tableCell: {
            border: "1px solid black",
            textAlign: "center",
            width: CELL_WIDTH,
            height: CELL_HEIGHT,
        }

    });
    const classes = useStyles();

    const onChange = () => {
        helper.update()
        setChange(change + 1)
    }

    return (
        <div>
            {change}
            <table className={classes.table}>
                <tbody>
                {sudoku.contents.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {row.map((col, colIndex) => {
                                return (
                                    <td className={classes.tableCell} key={colIndex}>
                                        <SudokuHint key={change} sudoku={sudoku} row={rowIndex} col={colIndex} helper={helper} />
                                        <SudokuCellEditor sudoku={sudoku} row={rowIndex} col={colIndex} onChange={onChange}/>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default SudokuEditor

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Sudoku, SudokuIndex } from "../types/Sudoku"
import SudokuCellEditor from "./SudokuCellEditor"
import SudokuHint from "./SudokuHint"
import { SudokuHelper } from "../types/SudokuHelper"
import { SudokuValue } from "../types/SudokuCell"
import SudokuOptionsEditor from "./SudokuOptionsEditor"
import SudokuSolver from "./SudokuSolver"
import SudokuEraser from "./SudokuEraser"
import { SudokuOptions } from "../types/SudokuOptions"
import SudokuPossibilities from "./SudokuPossibilities"
import { getStyle } from "../types/SudokuStyler"

export interface SudokuEditorProps {
    sudoku: Sudoku,
}

const CELL_WIDTH = 40
const CELL_HEIGHT = 40

export function SudokuEditor(props:SudokuEditorProps) {
    const [change, setChange] = useState("")
    const [options, setOptions] = useState({
        showPossibleValues: false,
        showHint: false
    } as SudokuOptions)

    const { sudoku } = props

    const helper = new SudokuHelper(sudoku)
    helper.analyze()

    const useStyles = makeStyles({
        table: {
            border: "1px solid black",
            borderSpacing: 0,
            width: sudoku.nCols * CELL_WIDTH,
            height: sudoku.nRows * CELL_HEIGHT,
            // maxWidth: sudoku.nCols * CELL_WIDTH,
            // maxHeight: sudoku.nRows * CELL_HEIGHT
        },
        tableCell: {
            position: "relative",
            backgroundColor: "inherit",
            border: "1px solid black",
            padding: 0,
            margin: 0,
            textAlign: "center",
            verticalAlign: "center",
            width: CELL_WIDTH,
            // minWidth: CELL_WIDTH,
            // maxWidth: CELL_WIDTH,
            height: CELL_HEIGHT,
            // minHeight: CELL_HEIGHT,
            // maxHeight: CELL_HEIGHT
        },
    });
    const classes = useStyles();

    const getKey = (index: SudokuIndex, value: SudokuValue) => {
        return `${index.row}.${index.col}.${value}`
    }

    const onChange = (index: SudokuIndex, value: SudokuValue) => {
        if (sudoku.isValidValue(index, value)) {
            sudoku.setValue(index, value)
        } else {
            sudoku.setValue(index, null)
        }
        value = sudoku.getValue(index)
        setChange(getKey(index, value))
        helper.analyze()
        return value
    }

    const onOption = (name: string, value: boolean) => {
        setOptions({
            ...options,
            [name]: value
        })
    }

    const onErase = () => {
        sudoku.clear()
        setChange("Clear")
    }

    // const values: number[][] = []
    // sudoku.rowIndexes.forEach(row => {
    //     sudoku.colIndexes.forEach(col => {
    //         const value = sudoku.getValue({row, col})
    //         if (value !== null) {
    //             values.push([row, col, value])
    //         }
    //     })
    // })

    return (
        <div>
                <table className={classes.table}>
                <tbody>
                {sudoku.rowIndexes.map(row => {
                    return (
                        <tr key={row}>
                            {sudoku.colIndexes.map(col => {
                                const index = {row, col}
                                const key = getKey(index, sudoku.getValue(index))
                                const style = getStyle(sudoku, index)
                                if (key === change) {
                                    style.backgroundColor = "LightBlue"
                                }
                                return (
                                    <td key={key} className={classes.tableCell} style={style}>
                                        <SudokuPossibilities sudoku={sudoku}
                                                             sudokuHelper={helper}
                                                             options={options}
                                                             index={index}/>
                                        <SudokuHint sudoku={sudoku}
                                                    sudokuHelper={helper}
                                                    options={options}
                                                    index={index}
                                                    onChange={onChange}/>
                                        <SudokuCellEditor sudoku={sudoku}
                                                          sudokuOptions={options}
                                                          index={index}
                                                          onChange={onChange}/>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <SudokuOptionsEditor options={options} onOption={onOption}/>
            <p>
                <SudokuSolver sudokuHelper={helper} onChange={onChange}/>
                &nbsp;
                <SudokuEraser onErase={onErase}/>
            </p>

            {/*<p>*/}
            {/*    {values.map(value => (*/}
            {/*        <div >*/}
            {/*            [{value.join(", ")}],*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</p>*/}

        </div>
    );
}

export default SudokuEditor

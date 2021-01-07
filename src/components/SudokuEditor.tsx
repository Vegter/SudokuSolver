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
import { Default } from "../config"
import SudokuPossibilities from "./SudokuPossibilities"
import { getStyle } from "../types/SudokuStyler"
import { Box, Grid } from "@material-ui/core"

export interface SudokuEditorProps {
    sudoku: Sudoku,
}

const CELL_WIDTH = 35
const CELL_HEIGHT = 35

export function SudokuEditor(props:SudokuEditorProps) {
    const [change, setChange] = useState("")
    const [options, setOptions] = useState(Default.options)

    const { sudoku } = props

    const helper = new SudokuHelper(sudoku)
    helper.analyze()

    const useStyles = makeStyles({
        table: {
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid black",
            borderSpacing: 0,
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
            height: CELL_HEIGHT,
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

    // const values = sudoku.indexes
    //     .filter(index => sudoku.getValue(index) !== null)
    //     .map(index => [index.row, index.col, sudoku.getValue(index)])

    return (
        <div>
        <Grid container
              direction={"column"}
              justify={"space-around"}
              alignItems={"center"}>
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

            </Grid>

            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
            >

            <SudokuOptionsEditor options={options} onOption={onOption}/>

            <div style={{textAlign: "right"}}>
                <Box mt={1}>
                    <SudokuSolver sudokuHelper={helper} onChange={onChange}/>
                </Box>

                <Box mt={1} mb={2}>
                    <SudokuEraser onErase={onErase}/>
                </Box>
            </div>

            </Grid>

            {/*<Box m={2}>*/}
            {/*    {values.map((value, i) => (*/}
            {/*        <div key={i}>*/}
            {/*            [{value.join(", ")}],*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</Box>*/}

        </div>
    );
}

export default SudokuEditor

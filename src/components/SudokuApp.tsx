import React, { useState } from 'react'

import { Default } from "../config"

import { SudokuVariant } from "../types/SudokuVariants"
import { SudokuFactory } from "../types/SudokuFactory"

import SudokuEditor from "./SudokuEditor"
import SudokuVariantSelector from "./SudokuVariantSelector"
import { Grid, Paper } from "@material-ui/core"

export default function SudokuApp() {
    const [variant, setVariant] = useState(Default.sudokuVariant)
    const [sudoku, setSudoku] = useState(SudokuFactory.create(variant, true))

    const onVariant = (variant: SudokuVariant) => {
        const sudoku = SudokuFactory.create(variant, true)
        setVariant(variant)
        setSudoku(sudoku)
    }

    return (
        <Paper elevation={3} style={{width: 375}}>
            <Grid container
                  direction={"column"}
                  justify={"space-around"}
                  alignItems={"center"}>
                <SudokuVariantSelector variant={variant} onVariant={onVariant}/>
                <SudokuEditor sudoku={sudoku}/>
            </Grid>
        </Paper>
    )
}
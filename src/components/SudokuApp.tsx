import React, { useState } from 'react'

import { Default } from "../config"

import { SudokuVariant } from "../types/SudokuVariants"
import { SudokuFactory } from "../types/SudokuFactory"

import SudokuEditor from "./SudokuEditor"
import SudokuVariantSelector from "./SudokuVariantSelector"
import { Grid, Paper } from "@material-ui/core"
import { Sudoku } from "../types/Sudoku"
import SudokuIdSelector from "./SudokuIdSelector"
import { SudokuHelper } from "../types/SudokuHelper"

const initialState = {
    variant: Default.sudokuVariant,
    ids: [] as string[],
    id: "",
    sudoku: null as Sudoku | null,
    helper: null as SudokuHelper | null
}

export default function SudokuApp() {
    const [state, setState] = useState(initialState)
    const {variant, ids, id, sudoku, helper} = state

    async function loadVariant(variant: SudokuVariant) {
        const sudoku = SudokuFactory.create(variant)
        const ids = await SudokuFactory.dataIds(variant)
        const id = ids[0]
        await variant.fill(sudoku, id)
        const helper = new SudokuHelper(sudoku)

        setState({
            ...state,
            variant,
            ids,
            id,
            sudoku,
            helper
        })
    }

    if (!sudoku) {
        loadVariant(variant)
        return (
            <p>Loading...</p>
        )
    }

    async function loadId(sudoku: Sudoku, id: string) {
        await variant.fill(sudoku, id)
    }

    const onVariant = async (variant: SudokuVariant) => {
        await loadVariant(variant)
    }

    const onId = async (id: string) => {
        await loadId(sudoku, id)
        setState({...state, id})
    }

    return (
        <Paper elevation={3} style={{width: 375}}>
            <Grid container
                  direction={"column"}
                  justify={"space-around"}
                  alignItems={"center"}>
                <Grid container
                      direction={"row"}
                      justify={"space-around"}
                      alignItems={"center"}>
                    <SudokuVariantSelector variant={variant} onVariant={onVariant}/>
                    <SudokuIdSelector ids={ids} id={id} onId={onId}/>
                </Grid>
                <SudokuEditor sudoku={sudoku} helper={helper!}/>
            </Grid>
        </Paper>
    )
}
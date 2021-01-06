import React, { useState } from 'react'

import { Default } from "../config"

import { SudokuVariant } from "../types/SudokuVariants"
import { SudokuFactory } from "../types/SudokuFactory"

import SudokuEditor from "./SudokuEditor"
import SudokuVariantSelector from "./SudokuVariantSelector"

export default function SudokuApp() {
    const [variant, setVariant] = useState(Default.sudokuVariant)
    const [sudoku, setSudoku] = useState(SudokuFactory.create(variant, true))

    const onVariant = (variant: SudokuVariant) => {
        const sudoku = SudokuFactory.create(variant, true)
        setVariant(variant)
        setSudoku(sudoku)
    }

    return (
        <div>
            <SudokuVariantSelector variant={variant} onVariant={onVariant}/>
            <SudokuEditor sudoku={sudoku}/>
        </div>
    )
}
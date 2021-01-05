import React, { useState } from 'react'
import SudokuEditor from "./SudokuEditor"
import SudokuVariantSelector from "./SudokuVariantSelector"
import { Default } from "../config"
import { SudokuVariant, SudokuVariants } from "../types/SudokuVariants"
import { SudokuFactory } from "../types/SudokuFactory"

const createSudoku = (variant: SudokuVariant) => {
    const sudoku = variant.create()
    if (variant === SudokuVariants.Basic) {
        SudokuFactory.fillBasicSudoku(sudoku)
    } else {
        SudokuFactory.fillNRCSudoku(sudoku)
    }
    return sudoku
}

export default function SudokuApp() {
    const [variant, setVariant] = useState(Default.sudokuVariant)
    const [sudoku, setSudoku] = useState(createSudoku(variant))

    const onVariant = (variant: SudokuVariant) => {
        const sudoku = createSudoku(variant)
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

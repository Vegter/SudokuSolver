import React from 'react'

import { Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

export interface SudokuEraserProps {
    onErase: () => void
}

function SudokuEraser(props: SudokuEraserProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={props.onErase}
        >
            Clear
        </Button>
    )
}

export default SudokuEraser
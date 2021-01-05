import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SudokuVariant, SudokuVariants } from "../types/SudokuVariants"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 140,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export interface SudokuVariantSelectorProps {
    variant: SudokuVariant,
    onVariant: (variant: SudokuVariant) => void
}

export default function SudokuVariantSelector(props: SudokuVariantSelectorProps) {
    const classes = useStyles();
    const [variant, setVariant] = useState(props.variant)

    const onChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const id = event.target.value as string
        const variant = Object.values(SudokuVariants).filter(v => v.id === id)
        if (variant.length) {
            setVariant(variant[0])
            props.onVariant(variant[0])
        }
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Sudoku Variant</InputLabel>
                <Select
                    native
                    value={variant.id}
                    onChange={onChange}
                >
                    {Object.values(SudokuVariants).map((option: SudokuVariant) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

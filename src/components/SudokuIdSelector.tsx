import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export interface SudokuIdSelectorProps {
    id: string,
    ids: string[],
    onId: (id: string) => void
}

export default function SudokuIdSelector(props: SudokuIdSelectorProps) {
    const classes = useStyles();
    const [id, setId] = useState(props.id)
    const {ids, onId} = props

    const onChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const id = event.target.value as string
        setId(id)
        onId(id)
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Sudoku Data</InputLabel>
                <Select
                    native
                    value={id}
                    onChange={onChange}
                >
                    {ids.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

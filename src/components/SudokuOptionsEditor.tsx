import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { SudokuOptions } from "../types/SudokuOptions"

export interface SudokuOptionsEditorProps {
    options: SudokuOptions,
    onOption: (name: string, value: boolean) => void
}

export default function SudokuOptionsEditor(props: SudokuOptionsEditorProps) {
    const [state, setState] = React.useState(props.options);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        setState({ ...state, [name]: checked });
        props.onOption(name, checked)
    };

    const switches = {
        showPossibleValues: "Show possible values",
        showHint: "Show hint"
    }

    return (
        <FormControl component="fieldset">
            <FormGroup>
                {Object.entries(switches).map(([name, label]) => {
                    const key = name as keyof SudokuOptions
                    return (
                        <FormControlLabel key={key}
                            control={
                                <Switch checked={state[key]}
                                        onChange={handleChange}
                                        name={name}/>
                            }
                            label={label}
                        />
                    )
                })}
            </FormGroup>
        </FormControl>
    );
}

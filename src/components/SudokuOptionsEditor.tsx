import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { SudokuOptionKeys, SudokuOptions, strategyMapping } from "../config"

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

    const switches: Record<SudokuOptionKeys, string> = {
        PossibleValues: "Show possible values",
        Hint: "Show hint",
        ...strategyMapping((strategy, config) => config.option.text)
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

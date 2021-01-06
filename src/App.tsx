import React from 'react';

import { Box, Grid } from "@material-ui/core"

import SudokuApp from "./components/SudokuApp"
import SudokuAppBar from "./components/SudokuAppBar"

function App() {
    return (
        <div>
            <Box mb={2}>
                <SudokuAppBar/>
            </Box>
            <Grid container
                  direction={"column"}
                  alignItems={"center"}
                  justify={"center"}>
                <SudokuApp/>
            </Grid>
        </div>
    );
}

export default App;

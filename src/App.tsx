import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Sudoku } from "./types/Sudoku"
import SudokuEditor from "./components/SudokuEditor"
import { Container } from "@material-ui/core"
import {
  SudokuAreaConstraint,
  SudokuColumnConstraint,
  SudokuConstraint,
  SudokuRowConstraint
} from "./types/SudokuConstraint"
import { SudokuHelper } from "./types/SudokuHelper"

function App() {
  const nRows = 9
  const nCols = 9

  const sudoku = new Sudoku(nRows, nCols);

  const rowRange = Array.from(Array(nRows).keys())
  const colRange = Array.from(Array(nCols).keys())
  const rowConstraints = rowRange.map(r => new SudokuRowConstraint(sudoku, r))
  const colConstraints = colRange.map(c => new SudokuColumnConstraint(sudoku, c))
  const areas = [0, 3, 6]
  const areaConstraints: SudokuConstraint[] = []
  areas.forEach(row => {
    areas.forEach(col => {
      areaConstraints.push(new SudokuAreaConstraint(sudoku, row, col))
    })
  })
  areaConstraints.push(new SudokuAreaConstraint(sudoku, 1, 1))
  areaConstraints.push(new SudokuAreaConstraint(sudoku, 1, 5))
  areaConstraints.push(new SudokuAreaConstraint(sudoku, 5, 1))
  areaConstraints.push(new SudokuAreaConstraint(sudoku, 5, 5))
  const constraints = [...rowConstraints, ...colConstraints, ...areaConstraints]

  const preFill = [
      [1, 0, 2],
      [1, 3, 4],
      [1, 4, 6],
      [1, 8, 5],
      [2, 8, 9],
      [3, 1, 1],
      [3, 5, 7],
      [5, 1, 9],
      [5, 5, 2],
      [5, 6, 5],
      [6, 2, 3],
      [7, 3, 6],
      [7, 5, 1],
      [7, 6, 4],
      [8, 3, 8]
  ]
  preFill.forEach(([row, col, value]) => sudoku.contents[row][col] = value);

  const sudokuHelper = new SudokuHelper(sudoku, constraints);
  sudokuHelper.update()

  return (
    <Container>
      <SudokuEditor sudoku={sudoku} sudokuHelper={sudokuHelper}/>
    </Container>
  );
}

export default App;

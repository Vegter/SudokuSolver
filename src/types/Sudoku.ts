export class Sudoku {
    static Values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    public nRows: number
    public nCols: number
    public contents: (number | null)[][]

    constructor(nRows: number, nCols: number) {
        this.nRows = nRows
        this.nCols = nCols

        this.contents = []
        for (let row = 0; row < nRows; row++) {
            this.contents[row] = []
            for (let col = 0; col < nCols; col++) {
                this.contents[row][col] = null
            }
        }
    }
}
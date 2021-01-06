import assert from "assert"
import { range } from "../utils"

export type SudokuValue = number | null

export class SudokuCell {
    static readonly ValidValues = range(1, 10)   // [1, ..., 9]
    private _value: SudokuValue = null

    constructor(value: SudokuValue = null) {
        this.value = value
    }

    static isValidValue(value: SudokuValue) {
        return value === null || SudokuCell.ValidValues.includes(value)
    }

    get value(): SudokuValue {
        return this._value
    }

    set value(value: SudokuValue) {
        assert(SudokuCell.isValidValue(value))
        this._value = value
    }

    equals(other: SudokuCell) {
        return this.value === other.value
    }

    get isNull() {
        return this.value === null
    }
}

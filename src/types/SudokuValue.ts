import assert from "assert"
import { range } from "../utils"

export type TSudokuValue = number | null

export class SudokuValue {
    static readonly ValidValues = range(1, 10)   // [1, ..., 9]
    private _value: TSudokuValue = null

    constructor(value: TSudokuValue = null) {
        this.value = value
    }

    static isValidValue(value: TSudokuValue) {
        return value === null || SudokuValue.ValidValues.includes(value)
    }

    get value(): TSudokuValue {
        return this._value
    }

    set value(value: TSudokuValue) {
        assert(SudokuValue.isValidValue(value))
        this._value = value
    }

    equals(other: SudokuValue) {
        return this.value === other.value
    }

    get isNull() {
        return this.value === null
    }
}

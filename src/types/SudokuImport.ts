export type ImportDataItem = [number, number, number]

export class SudokuImport {
    public readonly setup: Promise<void>
    private _data: {[id: string]: ImportDataItem[]} = {}

    constructor(dataURL: string) {
        this.setup = this.loadJSON(window.location.href + dataURL)
    }

    private async loadJSON(dataURL: string) {
        const response = await fetch(dataURL)
        this._data = await response.json()
    }

    getData(id: string): ImportDataItem[] {
        if (id in this._data) {
            return this._data[id]
        }
        return []
    }

    get ids(): string[] {
        return Object.keys(this._data)
    }
}
import { RangeElementWrongType } from "./errors/RangeElementWrongType";
import { RangeIndexDoesNotExist } from "./errors/RangeIndexDoesNotExist";
import { Range } from "./types/range";

export class RangeArray {
    constructor(private _range : Range) {

    }

    public get length() {
        return this._range.length;
    }

    public toArray() : Range {
        return [...this._range];
    }

    public asNumber(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "number") throw new RangeElementWrongType(index, 'number');
        return value;
    }

    public asString(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "string") throw new RangeElementWrongType(index, 'string');
        return value;
    }

    public asBool(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "boolean") throw new RangeElementWrongType(index, 'boolean');
        return value;
    }

    public asAny(index : number) : any {
        this._checkIndex(index);
        return this._range[index];
    }

    private _checkIndex(index : number) {
        if(!(index in this._range)) throw new RangeIndexDoesNotExist(index);
    }
}
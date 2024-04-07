import { RangeElementWrongType } from "./errors/RangeElementWrongType";
import { RangeIndexDoesNotExist } from "./errors/RangeIndexDoesNotExist";
import { Range } from "./types/range";

export class RangeArray {
    constructor(private _range : Range) {

    }

    public get length() {
        return this._range.length;
    }

    /**
     * @returns a copy of the elements.
     */
    public toArray() : Range {
        return [...this._range];
    }

    /**
     * Checks whether the index exists and if its element is of type number.
     * @param index argument position.
     * @throws RangeElementWrongType.
     * @returns a number.
     */
    public asNumber(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "number") throw new RangeElementWrongType(index, 'number');
        return value;
    }

    /**
     * Checks whether the index exists and if its element is of type string.
     * @param index argument position.
     * @throws RangeElementWrongType.
     * @returns a string.
     */
    public asString(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "string") throw new RangeElementWrongType(index, 'string');
        return value;
    }

    /**
     * Checks whether the index exists and if its element is of type boolean.
     * @param index argument position.
     * @throws RangeElementWrongType.
     * @returns a boolean.
     */
    public asBool(index : number) {
        this._checkIndex(index);
        const value = this._range[index];
        if(typeof value != "boolean") throw new RangeElementWrongType(index, 'boolean');
        return value;
    }

    /**
     * Checks whether the index exists and doesn't check the type.
     * @param index argument position.
     * @throws RangeElementWrongType.
     * @returns any.
     */
    public asAny(index : number) : any {
        this._checkIndex(index);
        return this._range[index];
    }

    /**
     * Checks whether the index exists in array.
     * @param index argument position.
     */
    private _checkIndex(index : number) {
        if(!(index in this._range)) throw new RangeIndexDoesNotExist(index);
    }
}
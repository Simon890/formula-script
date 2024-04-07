import { ArgumentDoesNotExist } from "./errors/ArgumentDoesNotExist"
import { ArgumentWrongType } from "./errors/ArgumentWrongType";
import { RangeArray } from "./RangeArray";

export class Arguments {

    constructor(private _values : unknown[]) {

    }

    public get length() {
        return this._values.length
    }

    /**
     * Checks whether the index exists and if its element is of type boolean.
     * @param index argument position.
     * @throws ArgumentWrongType.
     * @returns a boolean.
     */
    public asBool(index : number) : boolean {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "boolean") throw new ArgumentWrongType(value, "boolean");
        return value;
    }

    /**
     * Checks whether the index exists and if its element is of type string.
     * @param index argument position.
     * @throws ArgumentWrongType.
     * @returns a string.
     */
    public asString(index : number) : string {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "string") throw new ArgumentWrongType(value, "string");
        return value;
    }

    /**
     * Checks whether the index exists and if its element is of type number.
     * @param index argument position.
     * @throws ArgumentWrongType.
     * @returns a number.
     */
    public asNumber(index : number) : number {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "number") throw new ArgumentWrongType(value, "number");
        return value;
    }

    public asDate(index : number) : Date {
        this._checkIndex(index);
        const value = this._values[index];
        if(!(value instanceof Date)) throw new ArgumentWrongType(value, "date");
        return value;
    }

    /**
     * Checks whether the index exists and doesn't check the type.
     * @param index argument position.
     * @returns any.
     */
    public asAny(index : number) : any {
        this._checkIndex(index);
        return this._values[index];
    }

    /**
     * Checks whether the index exists and if its element is of type Range.
     * @param index argument position.
     * @throws ArgumentWrongType.
     * @returns a RangeArray.
     */
    public asRange(index : number) : RangeArray {
        this._checkIndex(index);
        const value = this._values[index];
        if(!Array.isArray((value))) throw new ArgumentWrongType(value, "range");
        return new RangeArray(value);
    }

    /**
     * Checks whether the index exists in array.
     * @param index argument position.
     */
    private _checkIndex(index : number) {
        if(!(index in this._values)) throw new ArgumentDoesNotExist(index);
    }
}
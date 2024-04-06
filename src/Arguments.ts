import { ArgumentDoesNotExist } from "./errors/ArgumentDoesNotExist"
import { ArgumentWrongType } from "./errors/ArgumentWrongType";
import { RangeArray } from "./RangeArray";

export class Arguments {

    constructor(private _values : unknown[]) {

    }

    public get length() {
        return this._values.length
    }

    public asBool(index : number) : boolean {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "boolean") throw new ArgumentWrongType(value, "boolean");
        return value;
    }

    public asString(index : number) : string {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "string") throw new ArgumentWrongType(value, "string");
        return value;
    }

    public asNumber(index : number) : number {
        this._checkIndex(index);
        const value = this._values[index];
        if(typeof value != "number") throw new ArgumentWrongType(value, "number");
        return value;
    }

    public asAny(index : number) : any {
        this._checkIndex(index);
        return this._values[index];
    }

    public asRange(index : number) : RangeArray {
        this._checkIndex(index);
        const value = this._values[index];
        if(!Array.isArray((value))) throw new ArgumentWrongType(value, "range");
        return new RangeArray(value);
    }

    private _checkIndex(index : number) {
        if(!(index in this._values)) throw new ArgumentDoesNotExist(index);
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";
import { Str } from "./Str";

export class Concat extends FormulaFunction {
    private _str : Str = new Str();

    call(args: Arguments): ValidType {
        let result = "";
        for (let i = 0; i < args.length; i++) {
            const value = args.asAny(i);
            result += this._str.call(new Arguments([value]));
        }
        return result;
    }
}
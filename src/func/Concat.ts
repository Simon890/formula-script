import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
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

    public metadata() : FFMetadata {
        return {
            desc: "Concatenates a variable number of elements of any type into a single string",
            args: [
                {
                    type: "...any",
                    desc: "A set of values to be concatenated"
                }
            ]
        }
    }
}
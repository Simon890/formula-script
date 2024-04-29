import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Abs extends FormulaFunction {
    call(args: Arguments): ValidType {
        const number = args.asNumber(0);
        return Math.abs(number);
    }

    public metadata() : FFMetadata {
        return {
            desc: "Returns the absolute value of a number",
            args: [
                {
                    type: "number",
                    desc: "Number for which you want to calculate the absolute value"
                }
            ]
        }
    }
}
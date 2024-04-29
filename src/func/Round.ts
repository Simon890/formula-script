import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Round extends FormulaFunction {
    call(args: Arguments): ValidType {
        const num = args.asNumber(0);
        const decimal = args.asNumber(1);
        return Number(num.toFixed(decimal));
    }

    public metadata() : FFMetadata {
        return {
            desc: "Rounds a number to a specified number of digits",
            args: [
                {
                    type: "number",
                    desc: "Number to be rounded"
                },
                {
                    type: "number",
                    desc: "Number of digits"
                }
            ]
        }
    }
}
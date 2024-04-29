import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Max extends FormulaFunction {
    call(args: Arguments): ValidType {
        let max = args.asNumber(0);
        for (let i = 1; i < args.length; i++) {
            const num = args.asNumber(i);
            if(num > max) {
                max = num;
            }
        }
        return max;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Returns the maximum value from a set of numbers",
            args: [
                {
                    type: "...number",
                    desc: "Any amount of numbers"
                }
            ]
        }
    }
}
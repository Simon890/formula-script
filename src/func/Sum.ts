import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Sum extends FormulaFunction {

    call(args: Arguments): ValidType {
        let sum = 0;
        for (let i = 0; i < args.length; i++) {
            sum += args.asNumber(i);
        }
        return sum;
    }

    numParams() : number | null | undefined {
        return null;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Calculates the sum of a set of numbers",
            args: [
                {
                    type: "...number",
                    desc: "Any amount of numbers"
                }
            ]
        }
    }
}
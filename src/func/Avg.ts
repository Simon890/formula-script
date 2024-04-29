import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Avg extends FormulaFunction {
    call(args: Arguments): ValidType {
        let total = 0;
        for (let i = 0; i < args.length; i++) {
            total += args.asNumber(i);
        }
        return total / args.length;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Calculates the average of a set of numbers.",
            args: [
                {
                    type: "...number",
                    desc: "Set of numbers to calculate the average"
                }
            ]
        }
    }
}
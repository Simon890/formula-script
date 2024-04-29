import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Sqrt extends FormulaFunction {
    call(args: Arguments): ValidType {
        const num = args.asNumber(0);
        return Math.sqrt(num);
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Calculates the square root of a number",
            args: [
                {
                    type: "number",
                    desc: "The number of which you want to calculate the square root"
                }
            ]
        }
    }
}
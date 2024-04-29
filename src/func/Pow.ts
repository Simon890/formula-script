import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Pow extends FormulaFunction {
    call(args: Arguments): ValidType {
        const base = args.asNumber(0);
        const power = args.asNumber(1);
        return Math.pow(base, power);
    }

    public metadata() : FFMetadata {
        return {
            desc: "Calculates the power of a number raised to a specified exponent",
            args: [
                {
                    type: "number",
                    desc: "Base number"
                },
                {
                    type: "number",
                    desc: "Exponent"
                }
            ]
        }
    }
}
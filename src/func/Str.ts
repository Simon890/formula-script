import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Str extends FormulaFunction {
    
    call(args: Arguments): ValidType {
        const value = args.asAny(0);
        if(typeof value == "boolean") return value ? "TRUE" : "FALSE";
        return String(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Casts a value to a string",
            args: [
                {
                    type: "any",
                    desc: "Value to be casted"
                }
            ]
        }
    }
}
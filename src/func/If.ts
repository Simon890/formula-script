import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class If extends FormulaFunction {
    call(args: Arguments): ValidType {
        const condition = args.asBool(0);
        if(condition) return args.asAny(1);
        return args.asAny(2)
    }
    public numParams(): number | null | undefined {
        return 3;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Evaluates a specified condition and returns one value if the condition is TRUE and another value if the condition is FALSE",
            args: [
                {
                    type: "boolean",
                    desc: "The condition to evaluate"
                },
                {
                    type: "any",
                    desc: "The value to return if the condition is TRUE"
                },
                {
                    type: "any",
                    desc: "The value to return if the condition is FALSE"
                }
            ]
        }
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Choose extends FormulaFunction {
    call(args: Arguments): ValidType {
        const index = Math.floor(Math.random() * args.length);
        return args.asAny(index);
    }

    public metadata() : FFMetadata {
        return {
            desc: "Returns a value from a list of arguments",
            args: [
                {
                    type: "...any",
                    desc: "A set of values"
                }
            ]
        }
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Choose extends FormulaFunction {
    call(args: Arguments): ValidType {
        const index = Math.floor(Math.random() * args.length);
        return args.asAny(index);
    }
}
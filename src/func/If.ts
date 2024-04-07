import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class If extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const condition = args.asBool(0);
        if(condition) return args.asAny(1);
        return args.asAny(2)
    }
}
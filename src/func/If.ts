import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
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
}
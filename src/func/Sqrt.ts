import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Sqrt extends FormulaFunction {
    call(args: Arguments): ValidType {
        const num = args.asNumber(0);
        return Math.sqrt(num);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
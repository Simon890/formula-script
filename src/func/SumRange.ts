import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class SumRange extends FormulaFunction {
    call(args: Arguments): ValidType {
        let total = 0;
        const range = args.asRange(0);
        for (let i = 0; i < range.length; i++) {
            total += range.asNumber(i);
        }
        return total;
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
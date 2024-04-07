import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class AvgRange extends FormulaFunction {
    call(args: Arguments): ValidType  {
        const range = args.asRange(0);
        let avg = 0;
        for (let i = 0; i < range.length; i++) {
            avg += range.asNumber(i);
        }
        return avg / range.length;
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class AvgRange extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
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
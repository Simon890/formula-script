import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";

export class NumberGtNumber extends FormulaFunction {
    call(args: Arguments): boolean {
        const left = args.asNumber(0);
        const right = args.asNumber(1);
        return left > right;
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
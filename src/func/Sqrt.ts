import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Sqrt extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const num = args.asNumber(0);
        return Math.sqrt(num);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
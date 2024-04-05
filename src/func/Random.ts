import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Random extends FormulaFunction {
    exec(args: Arguments): string | number | boolean {
        const min = args.asNumber(0);
        const max = args.asNumber(1);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public numParams(): number | null | undefined {
        return 2
    }
}
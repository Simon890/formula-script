import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Avg extends FormulaFunction {
    exec(args: Arguments): string | number | boolean {
        let total = 0;
        for (let i = 0; i < args.length; i++) {
            total += args.asNumber(i);
        }
        return total / args.length;
    }
}
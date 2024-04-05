import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Abs extends FormulaFunction {
    exec(args: Arguments): string | number | boolean {
        const number = args.asNumber(0);
        return Math.abs(number);
    }
}
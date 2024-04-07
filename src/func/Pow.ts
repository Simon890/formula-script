import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Pow extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const base = args.asNumber(0);
        const power = args.asNumber(1);
        return Math.pow(base, power);
    }
}
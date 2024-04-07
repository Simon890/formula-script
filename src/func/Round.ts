import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Round extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const num = args.asNumber(0);
        const decimal = args.asNumber(1);
        return Number(num.toFixed(decimal));
    }
}
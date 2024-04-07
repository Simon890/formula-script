import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Round extends FormulaFunction {
    call(args: Arguments): ValidType {
        const num = args.asNumber(0);
        const decimal = args.asNumber(1);
        return Number(num.toFixed(decimal));
    }
}
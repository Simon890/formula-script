import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Abs extends FormulaFunction {
    call(args: Arguments): ValidType {
        const number = args.asNumber(0);
        return Math.abs(number);
    }
}
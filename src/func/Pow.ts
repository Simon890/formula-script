import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Pow extends FormulaFunction {
    call(args: Arguments): ValidType {
        const base = args.asNumber(0);
        const power = args.asNumber(1);
        return Math.pow(base, power);
    }
}
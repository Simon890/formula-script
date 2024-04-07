import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Avg extends FormulaFunction {
    call(args: Arguments): ValidType {
        let total = 0;
        for (let i = 0; i < args.length; i++) {
            total += args.asNumber(i);
        }
        return total / args.length;
    }
}
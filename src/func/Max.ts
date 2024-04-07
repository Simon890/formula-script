import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Max extends FormulaFunction {
    call(args: Arguments): ValidType {
        let max = args.asNumber(0);
        for (let i = 1; i < args.length; i++) {
            const num = args.asNumber(i);
            if(num > max) {
                max = num;
            }
        }
        return max;
    }
}
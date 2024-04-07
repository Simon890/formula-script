import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Min extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        let min = args.asNumber(0);
        for (let i = 1; i < args.length; i++) {
            const num = args.asNumber(i);
            if(num < min) {
                min = num;
            }
        }
        return min;
    }
}
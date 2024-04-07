import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Max extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
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
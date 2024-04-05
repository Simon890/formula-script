import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Sum extends FormulaFunction {

    exec(args: Arguments): string | number | boolean {
        let sum = 0;
        for (let i = 0; i < args.length; i++) {
            sum += args.asNumber(i);
        }
        return sum;
    }

    numParams() : number | null | undefined {
        return null;
    }
}
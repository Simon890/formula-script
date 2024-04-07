import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Sum extends FormulaFunction {

    call(args: Arguments): ValidType {
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
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class NumberPowNumber extends FormulaFunction {
    
    call(args: Arguments): ValidType {
        const left = args.asNumber(0);
        const right = args.asNumber(1);
        return Math.pow(left, right);
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
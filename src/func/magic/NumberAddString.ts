import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class NumberAddString extends FormulaFunction {

    call(args: Arguments): ValidType {
        const left = args.asNumber(0);
        const right = args.asString(1);
        return left + right;
    }

    public numParams(): number | null | undefined {
        return 2
    }
};
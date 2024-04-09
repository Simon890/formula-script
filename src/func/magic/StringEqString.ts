import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class StringEqString extends FormulaFunction {
    call(args: Arguments): ValidType {
        const left = args.asString(0);
        const right = args.asString(1);
        return left == right;
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
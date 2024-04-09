import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class BoolAddBool extends FormulaFunction {
    call(args: Arguments): ValidType {
        const left = args.asBool(0);
        const right = args.asBool(1);
        return left == right;
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class NumberEqString extends FormulaFunction {
    call(args: Arguments): ValidType {
        return false;
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Today extends FormulaFunction {
    call(args: Arguments): ValidType {
        return new Date();
    }

    public numParams(): number | null | undefined {
        return 0;
    }
}
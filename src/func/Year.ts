import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Year extends FormulaFunction {
    call(args: Arguments): ValidType {
        const date = args.asDate(0);
        return date.getFullYear();
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
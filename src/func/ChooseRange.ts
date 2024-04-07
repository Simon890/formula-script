import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class ChooseRange extends FormulaFunction {
    call(args: Arguments): ValidType {
        const range = args.asRange(0);
        const index = Math.floor(Math.random() * range.length);
        return range.asAny(index);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
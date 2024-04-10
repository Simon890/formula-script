import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { TodayDate } from "../TodayDate";
import { ValidType } from "../types/validTypes";

export class Today extends FormulaFunction {
    call(args: Arguments): ValidType {
        return new TodayDate();
    }

    public numParams(): number | null | undefined {
        return 0;
    }
}
import dayjs from "dayjs";
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class DateEqDate extends FormulaFunction {
    
    call(args: Arguments): ValidType {
        const left = args.asDate(0);
        const right = args.asDate(1);
        return dayjs(left).isSame(right);
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
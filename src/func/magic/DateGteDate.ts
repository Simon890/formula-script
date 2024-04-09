import dayjs from "dayjs";
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class DateGteDate extends FormulaFunction {

    call(args: Arguments): ValidType {
        const left = args.asDate(0);
        const right = args.asDate(1);
        const leftDayjs = dayjs(left);
        return leftDayjs.isSame(right) || leftDayjs.isAfter(right);
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
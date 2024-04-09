import dayjs from "dayjs";
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class DateAddNumber extends FormulaFunction {

    call(args: Arguments): ValidType {
        const left = dayjs(args.asDate(0));
        const right = args.asNumber(1);
        return left.add(right, "days").toDate();
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
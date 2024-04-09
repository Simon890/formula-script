import dayjs from "dayjs";
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class NumberAddDate extends FormulaFunction {

    call(args: Arguments): ValidType {
        const left = args.asNumber(0);
        const right = dayjs(args.asDate(1));
        return right.add(left, "days").toDate();
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
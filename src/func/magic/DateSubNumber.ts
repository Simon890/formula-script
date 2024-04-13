import dayjs from "dayjs";
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";
import { ValidType } from "../../types/validTypes";

export class DateSubNumber extends FormulaFunction {
    
    call(args: Arguments): ValidType | Promise<ValidType> {
        const date = args.asDate(0);
        const number = args.asNumber(1);
        const dayjsDate = dayjs(date);
        return dayjsDate.subtract(number, "days").toDate();
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
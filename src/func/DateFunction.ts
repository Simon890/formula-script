import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";
dayjs.extend(customParseFormat);

export class DateFunction extends FormulaFunction {

    call(args: Arguments): ValidType {
        const year = args.asNumber(0);
        const month = args.asNumber(1);
        const day = args.asNumber(2);
        const dayDate = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD")
        if(!dayDate.isValid()) throw new Error("Invalid date");
        return dayDate.toDate();
    }

    public numParams(): number | null | undefined {
        return 3;
    }
}
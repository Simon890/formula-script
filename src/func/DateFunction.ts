import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";
import { FFMetadata } from "../types/formulaFunction";
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

    public metadata() : FFMetadata {
        return {
            desc: "Returns a date given the year, month and day parameters",
            args: [
                {
                    type: "number",
                    desc: "Year"
                },
                {
                    type: "number",
                    desc: "Month"
                },
                {
                    type: "number",
                    desc: "Day"
                }
            ]
        }
    }
}
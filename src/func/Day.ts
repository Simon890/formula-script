import dayjs from "dayjs";
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";
import { FFMetadata } from "../types/formulaFunction";

export class Day extends FormulaFunction {
    call(args: Arguments): ValidType {
        const date = args.asDate(0);
        return dayjs(date).date()
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Extracts the day component from a date and returns it as a number, ranging from 1 to 31",
            args: [
                {
                    type: "date",
                    desc: "Date from which you want to extract the day"
                }
            ]
        }
    }
}
import dayjs from "dayjs";
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Day extends FormulaFunction {
    call(args: Arguments): ValidType {
        const date = args.asDate(0);
        return dayjs(date).date()
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
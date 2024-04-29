import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Month extends FormulaFunction {
    call(args: Arguments): ValidType {
        const date = args.asDate(0);
        return date.getMonth() + 1;
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Extracts the month component of a date and returns it as a number between 1 and 12",
            args: [
                {
                    type: "date",
                    desc: "A date from which you want to extract the month"
                }
            ]
        }
    }
}
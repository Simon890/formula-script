import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Year extends FormulaFunction {
    call(args: Arguments): ValidType {
        const date = args.asDate(0);
        return date.getFullYear();
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Extracts the year component from a date and returns it as a four-digit number",
            args: [
                {
                    type: "date",
                    desc: "Date from which you want to extract the year"
                }
            ]
        }
    }
}
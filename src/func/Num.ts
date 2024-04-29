import { Arguments } from "../Arguments";
import { StringCannotBeCastedToNumber } from "../errors/StringCannotBeCastedToNumber";
import { FormulaFunction } from "../FormulaFunction";
import { RangeArray } from "../RangeArray";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Num extends FormulaFunction {
    call(args: Arguments): ValidType {
        const value = args.asAny(0);
        if(value instanceof RangeArray) throw new RangeArrayCannotBeCasted('number');
        if(typeof value == "string" && Number.isNaN(Number(value))) throw new StringCannotBeCastedToNumber(value);
        return Number(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Casts a value to a number",
            args: [
                {
                    type: "any",
                    desc: "Value to be casted to a number. It cannot be a range"
                }
            ]
        }
    }

}
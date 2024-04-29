import { Arguments } from "../Arguments";
import { NumberCannotBeCastedToBool } from "../errors/NumberCannotBeCastedToBool";
import { FormulaFunction } from "../FormulaFunction";
import { RangeArray } from "../RangeArray";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Bool extends FormulaFunction {
    call(args: Arguments): ValidType {
        const value = args.asAny(0);
        if(value instanceof RangeArray) throw new RangeArrayCannotBeCasted('boolean');
        if(value == "1" || value == 1) return true;
        if(value == "0" || value == 0) return false;
        throw new NumberCannotBeCastedToBool(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }

    public metadata() : FFMetadata {
        return {
            desc: "Casts a value to a boolean. 0 is converted to FALSE. 1 is converted to true",
            args: [
                {
                    desc: "Value to be casted to a boolean",
                    type: "boolean"
                }
            ]
        }
    }
}
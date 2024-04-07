import { Arguments } from "../Arguments";
import { NumberCannotBeCastedToBool } from "../errors/NumberCannotBeCastedToBool";
import { FormulaFunction } from "../FormulaFunction";
import { RangeArray } from "../RangeArray";

export class Bool extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const value = args.asAny(0);
        if(value instanceof RangeArray) throw new RangeArrayCannotBeCasted('boolean');
        if(value == "1" || value == 1) return true;
        if(value == "0" || value == 0) return false;
        throw new NumberCannotBeCastedToBool(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
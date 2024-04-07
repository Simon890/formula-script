import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { RangeArray } from "../RangeArray";

export class Num extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const value = args.asAny(0);
        if(value instanceof RangeArray) throw new RangeArrayCannotBeCasted('number');
        return Number(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
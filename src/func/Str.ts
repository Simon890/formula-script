import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Str extends FormulaFunction {
    
    call(args: Arguments): string | number | boolean {
        const value = args.asAny(0);
        return String(value);
    }

    public numParams(): number | null | undefined {
        return 1;
    }
}
import { Arguments } from "../../Arguments";
import { FormulaFunction } from "../../FormulaFunction";

export class NumberDivNumber extends FormulaFunction {
    
    call(args: Arguments): number {
        const left = args.asNumber(0);
        const right = args.asNumber(1);
        if(right == 0) throw new Error("Cannot divide by zero");
        return left / right;
    }

    public numParams(): number | null | undefined {
        return 2;
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Random extends FormulaFunction {
    call(args: Arguments): ValidType {
        const min = args.asNumber(0);
        const max = args.asNumber(1);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public numParams(): number | null | undefined {
        return 2
    }
}
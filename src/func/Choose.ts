import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Choose extends FormulaFunction {
    exec(args: Arguments): string | number | boolean {
        if(args.length == 1) {
            const value = args.asRange(0);
            const index = Math.floor(Math.random() * value.length);
            return value[index];
        }
        const index = Math.floor(Math.random() * args.length);
        return args.asAny(index);
    }
}
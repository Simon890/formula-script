import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Choose extends FormulaFunction {
    exec(args: Arguments): string | number | boolean {
        const index = Math.floor(Math.random() * args.length);
        return args.asAny(index);
    }
}
import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { ValidType } from "../types/validTypes";

export class Median extends FormulaFunction {
    call(args: Arguments): ValidType {
        let numbers : number[] = [];
        for (let i = 0; i < args.length; i++) {
            numbers.push(args.asNumber(i));
        }
        const l = numbers.length;
        if(l % 2 == 0) return numbers.slice(l / 2 - 1, l / 2 + 1).reduce((a, b) => a + b) / 2;
        return numbers.slice(l / 2, l / 2 + 1)[0];
    }
}
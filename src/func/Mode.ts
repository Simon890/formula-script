import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";

export class Mode extends FormulaFunction {
    call(args: Arguments): string | number | boolean {
        const frequency : any = {};
        for (let i = 0; i < args.length; i++) {
            const num = args.asNumber(i);
            if(num in frequency) {
                frequency[num]++;
            } else {
                frequency[num] = 1;
            }
        }

        let mode : number = 0;
        let maxFreq : number = 0;
        for (const key in frequency) {
            if(frequency[key] > maxFreq) {
                mode = key as unknown as number;
                maxFreq = frequency[key];
            }
        }
        return mode;
    }
}
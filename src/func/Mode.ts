import { Arguments } from "../Arguments";
import { FormulaFunction } from "../FormulaFunction";
import { FFMetadata } from "../types/formulaFunction";
import { ValidType } from "../types/validTypes";

export class Mode extends FormulaFunction {
    call(args: Arguments): ValidType {
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

    public metadata() : FFMetadata {
        return {
            desc: "Returns the most frequently occurring value in a set of numbers",
            args: [
                {
                    type: "...number",
                    desc: "Any amount of numbers"
                }
            ]
        }
    }
}
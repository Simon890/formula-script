import { Arguments } from "./Arguments";

export abstract class FormulaFunction {
    
    abstract exec(args : Arguments) : string | number | boolean;

    public numParams() : number | null | undefined {
        return undefined;
    }
}
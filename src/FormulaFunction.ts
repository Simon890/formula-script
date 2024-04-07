import { Arguments } from "./Arguments";

export abstract class FormulaFunction {
    
    abstract call(args : Arguments) : string | number | boolean;

    public numParams() : number | null | undefined {
        return undefined;
    }
}
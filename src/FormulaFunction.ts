import { Arguments } from "./Arguments";
import { ValidType } from "./types/validTypes";

export abstract class FormulaFunction {
    
    /**
     * Executes the function.
     * @param args list of arguments.
     * @returns a string, number or boolean.
     */
    abstract call(args : Arguments) : ValidType | Promise<ValidType>;

    /**
     * Defines the amount of parameter the function must have.
     * If it returns null or undefined, the function can have 0 or any amount of parameters.
     * @returns the amount of parameter the function must have.
     */
    public numParams() : number | null | undefined {
        return undefined;
    }
}
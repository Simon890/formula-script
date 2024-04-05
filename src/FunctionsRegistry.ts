import { FunctionDoesNotExist } from "./errors/FunctionDoesNotExist";
import { FormulaFunction } from "./FormulaFunction";

export class FunctionsRegistry {
    private _functions = new Map<string, FormulaFunction>();

    constructor() {
    }

    public register(name: string, a: FormulaFunction) {
        this._functions.set(name, a);
    }

    public remove(name: string) {
        this._functions.delete(name);
    }

    public get(name: string) : FormulaFunction {
        if(this._functions.has(name)) return this._functions.get(name)!;
        throw new FunctionDoesNotExist(name);
    }
}
import { FunctionDoesNotExist } from "./errors/FunctionDoesNotExist";
import { FormulaFunction } from "./FormulaFunction";
import { ObjectFormulaFunction } from "./types/formulaFunction";

export class FunctionsRegistry {
    private _functions = new Map<string, FormulaFunction | ObjectFormulaFunction>();

    constructor() {
    }

    public register(name: string, a: FormulaFunction | ObjectFormulaFunction) {
        this._functions.set(name, a);
    }

    public remove(name: string) {
        this._functions.delete(name);
    }

    public rename(name: string, newName: string) {
        const formulaFunction = this.get(name);
        this.remove(name);
        this.register(newName, formulaFunction);
    }

    public get(name: string) : FormulaFunction | ObjectFormulaFunction {
        if(this._functions.has(name)) return this._functions.get(name)!;
        throw new FunctionDoesNotExist(name);
    }
}
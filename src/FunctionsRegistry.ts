import { FunctionDoesNotExist } from "./errors/FunctionDoesNotExist";
import { FormulaFunction } from "./FormulaFunction";
import { ObjectFormulaFunction } from "./types/formulaFunction";

export class FunctionsRegistry {
    private _functions = new Map<string, FormulaFunction | ObjectFormulaFunction>();
    private _magicFunctions = new Map<string, FormulaFunction | ObjectFormulaFunction>();

    constructor() {
    }

    /**
     * Registers a function.
     * @param name Function's name.
     * @param a FormulaFunction | ObjectFormulaFunction.
     */
    public register(name: string, a: FormulaFunction | ObjectFormulaFunction) {
        if(name.startsWith("_")) this._magicFunctions.set(name, a);
        else this._functions.set(name, a);
    }

    /**
     * Removes a function from registry.
     * @param name Function's name.
     */
    public remove(name: string) {
        this._functions.delete(name);
    }

    /**
     * Renames a function.
     * @param name Function's name.
     * @param newName Function's new name.
     */
    public rename(name: string, newName: string) {
        const formulaFunction = this.get(name);
        this.remove(name);
        this.register(newName, formulaFunction);
    }

    /**
     * Get the function if found. If not, it throws an error.
     * @param name Function's name.
     * @throws FunctionDoesNotExist.
     * @returns FormulaFunction | ObjectFormulaFunction.
     */
    public get(name: string) : FormulaFunction | ObjectFormulaFunction {
        if(this.has(name)) return name.startsWith("_") ? this._magicFunctions.get(name)! : this._functions.get(name)!;
        throw new FunctionDoesNotExist(name);
    }

    public has(name : string) {
        if(name.startsWith("_")) return this._magicFunctions.has(name);
        return this._functions.has(name);
    }
}
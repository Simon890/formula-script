import { FunctionDoesNotExist } from "./errors/FunctionDoesNotExist";
import { FormulaFunction } from "./FormulaFunction";
import { Config } from "./types/config";
import { FormulaFunctionResult, ObjectFormulaFunction } from "./types/formulaFunction";

export class FunctionsRegistry {
    private _functions = new Map<string, FormulaFunction | ObjectFormulaFunction>();
    private _magicFunctions = new Map<string, FormulaFunction | ObjectFormulaFunction>();
    private _config : Config;

    constructor(config ?: Config) {
        this._config = {
            useLiteralDate: true,
            isCaseSensitive: true,
            ...config
        }
    }

    /**
     * Registers a function.
     * @param name Function's name.
     * @param a FormulaFunction | ObjectFormulaFunction.
     */
    public register(name: string, a: FormulaFunction | ObjectFormulaFunction) {
        let finalName = this._config.isCaseSensitive ? name : name.toUpperCase();
        if(finalName.startsWith("_")) this._magicFunctions.set(finalName, a);
        else this._functions.set(finalName, a);
    }

    /**
     * Removes a function from registry.
     * @param name Function's name.
     */
    public remove(name: string) {
        this._functions.delete(name.toUpperCase());
    }

    /**
     * Renames a function.
     * @param name Function's name.
     * @param newName Function's new name.
     */
    public rename(name: string, newName: string) {
        const finalName = this._config.isCaseSensitive ? name : name.toUpperCase();
        const finalNewName = this._config.isCaseSensitive ? name : newName.toUpperCase();
        const formulaFunction = this.get(finalName);
        this.remove(finalName);
        this.register(finalNewName, formulaFunction);
    }

    /**
     * Get the function if found. If not, it throws an error.
     * @param name Function's name.
     * @throws FunctionDoesNotExist.
     * @returns FormulaFunction | ObjectFormulaFunction.
     */
    public get(name: string) : FormulaFunction | ObjectFormulaFunction {
        const finalName = this._config.isCaseSensitive ? name : name.toUpperCase();
        if(this.has(finalName)) return finalName.startsWith("_") ? this._magicFunctions.get(finalName)! : this._functions.get(finalName)!;
        throw new FunctionDoesNotExist(finalName);
    }

    public getAll() : FormulaFunctionResult {
        const functions : FormulaFunctionResult['functions'] = {};
        const magicFunctions : FormulaFunctionResult['functions'] = {};

        this._functions.forEach((value, key) => {
            functions[key] = value;
        });
        this._magicFunctions.forEach((value, key) => {
            magicFunctions[key] = value;
        });
        return {
            functions,
            magicFunctions
        }
    }

    public has(name : string) {
        const finalName = this._config.isCaseSensitive ? name : name.toUpperCase();
        if(finalName.startsWith("_")) return this._magicFunctions.has(finalName);
        return this._functions.has(finalName);
    }
}
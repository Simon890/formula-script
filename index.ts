import { Interpreter } from "./src/Interpreter";
import { Range, RangeHandlerFunction, RangeHandlerClassFunction } from "./src/types/range";
import { RangeArray } from "./src/RangeArray";
import { ObjectFormulaFunction } from "./src/types/formulaFunction";
import { FormulaFunction } from "./src/FormulaFunction";
import { Arguments } from "./src/Arguments";
import { AsyncInterpreter } from "./src/AsyncInterpreter";

export const FormulaScript = Interpreter;
export const AsyncFormulaScript = AsyncInterpreter;
export {
    Range,
    RangeHandlerClassFunction,
    RangeHandlerFunction,
    RangeArray,
    ObjectFormulaFunction,
    FormulaFunction,
    Arguments,
}
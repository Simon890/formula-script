import { Interpreter } from "./src/Interpreter";
import { Range, RangeHandlerFunction, RangeHandlerClassFunction } from "./src/types/range";
import { RangeArray } from "./src/RangeArray";
import { ObjectFormulaFunction } from "./src/types/formulaFunction";

export const FormulaScript = Interpreter;
export {
    Range,
    RangeHandlerClassFunction,
    RangeHandlerFunction,
    RangeArray,
    ObjectFormulaFunction
}
import { Arguments } from "../Arguments"
import { ValidType } from "./validTypes"

export type ObjectFormulaFunction = {
    call: (args: Arguments) => ValidType | Promise<ValidType>,
    numParams: (() => number | null | undefined) | (number | null | undefined)
}
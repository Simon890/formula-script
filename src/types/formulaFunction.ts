import { Arguments } from "../Arguments"
import { FailFunction } from "./failCb"
import { ValidType } from "./validTypes"

export type ObjectFormulaFunction = {
    call: (args: Arguments, fail : FailFunction) => ValidType | Promise<ValidType> | never,
    numParams?: (() => number | null | undefined) | (number | null | undefined)
}
import { Arguments } from "../Arguments"
import { FormulaFunction } from "../FormulaFunction"
import { FailFunction } from "./failCb"
import { ValidType } from "./validTypes"

export type ObjectFormulaFunction = {
    call: (args: Arguments, fail : FailFunction) => ValidType | Promise<ValidType> | never,
    numParams?: (() => number | null | undefined) | (number | null | undefined),
    metadata?: any | (() => any)
}

export type ArgMetadata = {
    type : "number" | "string" | "boolean" | "date" | "range" | "any" | "...number" | "...string" | "...boolean" | "...date" | "...range" | "...any",
    desc : string
}

export type FFMetadata = {
    desc : string,
    args : ArgMetadata[]
}

export type FormulaFunctionResult = {
    functions: {
        [key: string] : FormulaFunction | ObjectFormulaFunction
    },
    magicFunctions: {
        [key: string] : FormulaFunction | ObjectFormulaFunction
    }
}
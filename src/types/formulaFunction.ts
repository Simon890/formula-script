import { Arguments } from "../Arguments"

export type ObjectFormulaFunction = {
    call: (args: Arguments) => string | number | boolean,
    numParams: undefined | (() => number | null | undefined)
}
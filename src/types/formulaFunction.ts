import { Arguments } from "../Arguments"

export type ObjectFormulaFunction = {
    call: (args: Arguments) => string | number | boolean,
    numParams: (() => number | null | undefined) | (number | null | undefined)
}
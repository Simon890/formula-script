import { Arguments } from "../Arguments"

export type ObjectFormulaFunction = {
    exec: (args: Arguments) => string | number | boolean,
    numParams: undefined | (() => number | null | undefined)
}
export class StringCannotBeCastedToNumber extends Error {
    constructor(value : string) {
        super(`String '${value}' cannot be casted to number`)
    }
}
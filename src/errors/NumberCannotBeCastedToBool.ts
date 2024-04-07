export class NumberCannotBeCastedToBool extends Error {
    constructor(num : number | string) {
        super(`Number ${num} cannot be casted to boolean. Accepted values: 1 => true, 0 => false`)
    }
}
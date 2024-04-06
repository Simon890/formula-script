export class RangeElementWrongType extends Error {
    constructor(index : number, expectedType : string) {
        super(`Element at position ${index} must be ${expectedType}`);
    }
}
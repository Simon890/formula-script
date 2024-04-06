export class RangeIndexDoesNotExist extends Error {
    constructor(index : number) {
        super(`Element at position ${index} does not exist in range`);
    }
}
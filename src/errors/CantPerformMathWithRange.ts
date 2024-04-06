export class CantPerformMathWithRange extends Error {
    constructor() {
        super("Cannot perform mathematical operations with ranges");
    }
}
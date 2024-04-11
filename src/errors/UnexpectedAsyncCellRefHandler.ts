export class UnexpectedAsyncCellRefHandler extends Error {
    constructor() {
        super(`Unexpected async cell ref handler. If you want to be abe to use asynchronous functions you must use 'AsyncFormulaScript'.`);
    }
}
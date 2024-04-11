export class UnexpectedAsyncRangeHandler extends Error {
    constructor() {
        super(`Unexpected async range handler. If you want to be abe to use asynchronous functions you must use 'AsyncFormulaScript'.`);
    }
}
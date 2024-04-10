export class UnexpectedAsyncFunction extends Error {
    constructor(functionName : string) {
        super(`Unexpected async function '${functionName}'. If you want to be abe to call asynchronous functions you must use 'AsyncFormulaScript'.`);
    }
}
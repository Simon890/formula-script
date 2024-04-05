export class FunctionDoesNotExist extends Error {
    constructor(functionName: string) {
        super(`Function '${functionName}' does not exist`);
    }
}
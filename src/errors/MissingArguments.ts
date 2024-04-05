export class MissingArguments extends Error {
    constructor(functionName : string, expected: number, received: number) {
        super(`Function '${functionName}' expected ${expected} parameters but received ${received}`);
    }
}
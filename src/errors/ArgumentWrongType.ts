export class ArgumentWrongType extends Error {
    constructor(argValue : any, type : string) {
        super(`Argument ${argValue} is not ${type}`);
    }
}
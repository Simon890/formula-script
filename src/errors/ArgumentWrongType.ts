export class ArgumentWrongType extends Error {
    constructor(argValue : any, type : string) {
        const argValueType = Array.isArray(argValue) ? 'range' : typeof argValue;
        super(`Argument ${argValueType} is not a ${type}`);
    }
}
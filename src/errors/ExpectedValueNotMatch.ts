export class ExpectedValueNotMatch extends Error {
    constructor(expectedType : string, receivedType : string) {
        super(`Expected a ${expectedType} type but received ${receivedType}`);
    }
}
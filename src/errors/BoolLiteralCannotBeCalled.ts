export class BoolLiteralCannotBeCalled extends Error {
    constructor(literal : string) {
        super(`${literal} cannot be called like a function`);
    }
}
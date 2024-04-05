export class CantAddBoolValue extends Error {
    constructor() {
        super("Cannot add a boolean value");
    }
}
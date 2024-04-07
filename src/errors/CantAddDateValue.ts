export class CantAddDateValue extends Error {
    constructor() {
        super("Cannot add a date value");
    }
}
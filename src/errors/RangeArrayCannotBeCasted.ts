class RangeArrayCannotBeCasted extends Error {
    constructor(type : string) {
        super(`Range cannot be casted to ${type}`);
    }
}
export class BinaryOperationError extends Error {
    constructor(action : string, type1 : string, type2 : string) {
        const char = /^[aeiouAEIOU]/.test(action) ? 'an' : 'a';
        super(`Cannot perform ${char} ${action.toLowerCase()} between a ${type1} and a ${type2}`);
    }
}
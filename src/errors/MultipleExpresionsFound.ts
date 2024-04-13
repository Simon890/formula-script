export class MultipleExpressionsFound extends Error {
    constructor() {
        super("Found multiple expressions. Perhaps you forgot an operator?");
    }
}
export class ArgumentDoesNotExist extends Error {
    constructor(index : number) {
        super(`Argument at position ${index} does not exist`);
    }
}
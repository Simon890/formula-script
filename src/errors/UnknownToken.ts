export class UnknownTokenError extends Error {
    constructor(unkownChar : string, pos : number) {
        super(`Uknown token (${unkownChar}) at position ${pos}`);
    }
}
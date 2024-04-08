import { TokenType } from "../types/tokens";

export class UnexpectedToken extends Error {
    constructor(expectedType: TokenType | TokenType[], receivedToken: TokenType, pos: number) {
        let expectedStr : string | typeof expectedType = expectedType;
        if(Array.isArray(expectedType)) expectedStr = expectedType.join(" or ");
        super(`Unexpected token at position ${pos}. Expected '${expectedStr}', got '${receivedToken}'`)
    }
}
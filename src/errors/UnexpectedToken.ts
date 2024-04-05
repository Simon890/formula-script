import { Token, TokenType } from "../types/tokens";

export class UnexpectedToken extends Error {
    constructor(expectedType: TokenType, receivedToken: TokenType, pos: number) {
        super(`Unexpected token at position ${pos}. Expected '${expectedType}', got '${receivedToken}'`)
    }
}
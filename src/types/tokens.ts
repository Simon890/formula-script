export type TokenIdentifier = {
    type: "Identifier",
    value: string
}

export type TokenNumberLiteral = {
    type: "NumberLiteral",
    value: number
}

export type TokenBoolLiteral = {
    type: "BoolLiteral",
    value: boolean
}

export type TokenStringLiteral = {
    type: "StringLiteral",
    value: string
}

export type TokenRange = {
    type: "Range",
    value: string,
    left: string,
    right: string
}

export type TokenLeftParen = {
    type: "LeftParen",
    value: "(" | string
}

export type TokenRightParen = {
    type: "RightParen",
    value: ")" | string
}

export type TokenComma = {
    type: "Comma",
    value: "," | string
}

export type TokenAddOp = {
    type: "AddOp",
    value: "+" | string
}

export type TokenSubOp = {
    type: "SubOp",
    value: "-" | string
}

export type TokenMultOp = {
    type: "MultOp",
    value: "*" | string
}

export type TokenPowOp = {
    type: "PowOp",
    value: "^" | string
}

export type TokenDivOp = {
    type: "DivOp",
    value: "/" | string
}

export type TokenEqOp = {
    type: "EqOp",
    value: "=" | string
}

export type TokenNotEqOp = {
    type: "NotEqOp",
    value: "!=" | string
}

export type TokenGtOp = {
    type: "GtOp",
    value: ">" | string
}

export type TokenLtOp = {
    type: "LtOp",
    value: "<" | string
}

export type TokenColon = {
    type: "Colon",
    value: ":"
}

export type TokenEOF = {
    type: "EOF",
    value: string
}

export type TokenFunctionCall = {
    type: "FunctionCall",
    value: string,
    args: Token[]
}

export type BinaryExpression = {
    left: Token,
    right: Token,
    operator: string,
    type: "BinaryExpression",
    value: string
}

export type UnaryExpression = {
    type: "UnaryExpression",
    operator: string,
    value: Token
}


export type Token = TokenIdentifier | TokenNumberLiteral | TokenBoolLiteral | TokenRightParen | TokenLeftParen | TokenComma | TokenAddOp | TokenSubOp | TokenMultOp | TokenPowOp | TokenDivOp | BinaryExpression | TokenEOF | TokenFunctionCall | TokenGtOp | TokenLtOp | TokenEqOp | TokenNotEqOp | TokenStringLiteral | TokenColon | TokenRange | UnaryExpression;

export type TokenType = Token["type"];
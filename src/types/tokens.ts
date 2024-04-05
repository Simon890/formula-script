export type TokenIdentifier = {
    type: "Identifier",
    value: string
}

export type TokenNumberLiteral = {
    type: "NumberLiteral",
    value: number
}

export type TokenLeftParen = {
    type: "LeftParen",
    value: "("
}

export type TokenRightParen = {
    type: "RightParen",
    value: ")"
}

export type TokenComma = {
    type: "Comma",
    value: ","
}

export type TokenAddOp = {
    type: "AddOp",
    value: "+"
}

export type TokenSubOp = {
    type: "SubOp",
    value: "-"
}

export type TokenMultOp = {
    type: "MultOp",
    value: "*"
}

export type TokenDivOp = {
    type: "DivOp",
    value: "/"
}

export type Token = TokenIdentifier | TokenNumberLiteral | TokenRightParen | TokenLeftParen | TokenComma | TokenAddOp | TokenSubOp | TokenMultOp | TokenDivOp;
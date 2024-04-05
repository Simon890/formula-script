import { Token } from "./tokens"

export type AST = {
    type: "Program",
    body: Array<Token>
}
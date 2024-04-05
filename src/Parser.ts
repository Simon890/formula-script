import { UnexpectedToken } from "./errors/UnexpectedToken";
import { AST } from "./types/ast";
import { BinaryExpression, Token, TokenNumberLiteral, TokenType } from "./types/tokens";

export class Parser {
    
    private _pos = 0;
    private _ast : AST = {
        type: "Program",
        body: []
    };

    constructor(private _tokens : Token[]) {
    }

    public parse() {
        while(!this._isEOF()) {
            if(this._isExpression()) {
                const token = this._sumExpression();
                this._ast.body.push(token);
                continue;
            }
        }
        return this._ast;
    }

    private _current() {
        return this._tokens[this._pos];
    }

    private _isEOF() {
        return this._tokens[this._pos].type == "EOF";
    }

    private _isExpression() {
        const token = this._current();
        return token.type == "NumberLiteral" || token.type == "Identifier" || token.type == "LeftParen";
    }

    private _expect(type: TokenType) {
        if(this._isEOF()) return false;
        return this._tokens[this._pos + 1].type == type;
    }

    private _advance(type?: TokenType) {
        if(type) {
            if(this._current().type == type) {
                const token = this._current();
                this._pos++;
                return token;
            }
            throw new UnexpectedToken(type, this._current().type, this._pos + 1);
        }
        const token = this._current();
        this._pos++;
        return token;
    }

    private _numberLiteral() : TokenNumberLiteral {
        const value = this._advance("NumberLiteral");
        return value as TokenNumberLiteral;
    }

    private _sumExpression() : BinaryExpression {
        let left : Token = this._multExpression();
        while(!this._isEOF() && (this._current().value == "+" || this._current().value == "-")) {
            const mathToken = this._advance(this._current().type);
            const operator = mathToken.value as string;
            const right = this._multExpression();
            left = {
                left,
                right,
                operator,
                type: "BinaryExpression",
                value: ""
            }
        }
        return left as BinaryExpression;
    }

    private _multExpression(): BinaryExpression {
        let left : Token = this._expression();
        while(!this._isEOF() && (this._current().value == "*" || this._current().value == "/")) {
            const mathToken = this._advance(this._current().type);
            const operator = mathToken.value as string;
            const right = this._expression();
            left = {
                left,
                right,
                operator,
                type: "BinaryExpression",
                value: ""
            }
        }
        return left as BinaryExpression;
    }

    private _expression(): Token {
        if(this._current().type == "NumberLiteral") return this._numberLiteral();

        if(this._current().type == "LeftParen") {
            this._advance("LeftParen");
            const expr = this._sumExpression();
            this._advance("RightParen");
            return expr;
        }
        throw new Error("Unexpected end of input");
    }
}
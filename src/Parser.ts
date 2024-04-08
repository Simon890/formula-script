import { BoolLiteralCannotBeCalled } from "./errors/BoolLiteralCannotBeCalled";
import { UnexpectedToken } from "./errors/UnexpectedToken";
import { AST } from "./types/ast";
import { BinaryExpression, Token, TokenBoolLiteral, TokenFunctionCall, TokenNumberLiteral, TokenRange, TokenStringLiteral, TokenType } from "./types/tokens";

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
            const token = this._boolExpression();
            this._ast.body.push(token);
            continue;
        }
        return this._ast;
    }

    private _current() {
        return this._tokens[this._pos];
    }

    private _isEOF() {
        return this._tokens[this._pos].type == "EOF";
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

    private _stringLiteral(): TokenStringLiteral {
        const value = this._advance("StringLiteral");
        return value as TokenStringLiteral;
    }

    private _boolLiteral() : TokenBoolLiteral {
        const value = this._advance("BoolLiteral");
        return value as TokenBoolLiteral;
    }

    private _range() : TokenRange {
        const left = this._advance("Identifier");
        this._advance("Colon");
        const right = this._advance("Identifier");
        return {
            value: "",
            left: String(left.value),
            right: String(right.value),
            type: "Range"
        }
    }

    private _boolExpression(): BinaryExpression {
        let left : Token = this._sumExpression();
        while(!this._isEOF() && (this._current().value == "=" || this._current().value == ">" || this._current().value == "<" || this._current().value == "!=")) {
            const boolToken = this._advance(this._current().type);
            let operator = boolToken.value as string;
            if(this._current().value == "=" || this._current().value == ">" || this._current().value == "<") {
                const secondBoolToken = this._advance(this._current().type);
                operator += secondBoolToken.value as string;
            }
            const right = this._sumExpression();
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
        if(this._current().type == "StringLiteral") return this._stringLiteral();
        if(this._current().type == "BoolLiteral") {
            if(this._expect("LeftParen")) throw new BoolLiteralCannotBeCalled(this._current().value ? "TRUE" : "FALSE");
            return this._boolLiteral();
        }
        if(this._current().type == "AddOp" || this._current().type == "SubOp") {
            const mathOp = this._advance();
            const numberLiteral = this._numberLiteral();
            numberLiteral.value *= mathOp.type == "SubOp" ? -1 : 1;
            return numberLiteral
        }
        if(this._current().type == "LeftParen") {
            this._advance("LeftParen");
            const expr = this._boolExpression();
            this._advance("RightParen");
            return expr;
        }
        if(this._current().type == "Identifier") {
            if(this._expect('LeftParen')) return this._functionCall();
            if(this._expect("Colon")) return this._range();
            return this._advance("Identifier");
        }
        throw new Error("Unexpected end of input");
    }

    private _functionCall(): TokenFunctionCall {
        const value = this._advance("Identifier").value as string;
        const args : Token[] = [];
        this._advance("LeftParen");
        while(this._current().type != "RightParen") {
            const expr = this._boolExpression();
            args.push(expr);
            if(this._current().type == "RightParen") {
                break;
            }
            this._advance("Comma");
        }
        this._advance("RightParen");
        return {
            args,
            type: "FunctionCall",
            value
        }
    }
}
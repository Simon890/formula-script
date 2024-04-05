import { UnknownTokenError } from "./errors/UnknownToken";
import { Token, TokenAddOp, TokenComma, TokenDivOp, TokenIdentifier, TokenLeftParen, TokenMultOp, TokenNumberLiteral, TokenRightParen, TokenSubOp } from "./types/tokens";

export class Tokenizer {
    private _pos = 0;
    private _tokens : Token[] = [];
    constructor(private _text : string) {

    }

    public tokenize() : Token[] {
        this._tokens = [];
        while(!this._isEOF()) {
            this._skipEmptySpace();
            const current = this._current();
            if(this._isChar(current)) {
                const identifier = this._identifier();
                this._tokens.push(identifier);
                continue;
            }
            if(this._isNumber(current) || this._isDecimalPoint(current)) {
                const numberToken = this._number();
                this._tokens.push(numberToken);
                continue;
            }
            if(this._isLeftParen(current)) {
                const leftParen = this._leftParen();
                this._tokens.push(leftParen);
                continue;
            }
            if(this._isRightParen(current)) {
                const leftParen = this._rightParen();
                this._tokens.push(leftParen);
                continue;
            }
            if(this._isComma(current)) {
                const comma = this._comma();
                this._tokens.push(comma);
                continue;
            }

            //Operands
            if(this._isAddOp(current)) {
                this._tokens.push(this._addOp());
                continue;
            }
            if(this._isSubOp(current)) {
                this._tokens.push(this._subOp());
                continue;
            }
            if(this._isDivOp(current)) {
                this._tokens.push(this._divOp());
                continue;
            }
            if(this._isMultOp(current)) {
                this._tokens.push(this._multOp());
                continue;
            }

            throw new UnknownTokenError(current, this._pos + 1);
        }
        return this._tokens;
    }

    private _current() : string {
        return this._text[this._pos];
    }

    private _advance() {
        this._pos++;
    }

    private _isEOF() : boolean {
        return this._pos >= this._text.length;
    }

    private _isChar(value : string) : boolean {
        return REGEX.CHAR.test(value);
    }

    private _isNumber(value: string): boolean {
        return REGEX.NUMBER.test(value);
    }

    private _isLeftParen(value: string): boolean {
        return REGEX.LEFT_PAREN.test(value);
    }

    private _isRightParen(value: string): boolean {
        return REGEX.RIGHT_PAREN.test(value);
    }

    private _isComma(value: string): boolean {
        return REGEX.COMMA.test(value);
    }

    private _isEmptySpace(value: string): boolean {
        return REGEX.EMPTY_SPACE.test(value);
    }

    private _isDecimalPoint(value: string): boolean {
        return REGEX.DECIMAL.test(value);
    }

    private _isAddOp(value: string): boolean {
        return REGEX.ADD_OP.test(value);
    }

    private _isSubOp(value: string): boolean {
        return REGEX.SUB_OP.test(value);
    }

    private _isMultOp(value: string): boolean {
        return REGEX.MULT_OP.test(value);
    }

    private _isDivOp(value: string): boolean {
        return REGEX.DIV_OP.test(value);
    }

    private _skipEmptySpace() {
        while(this._isEmptySpace(this._current())) {
            this._advance();
        }
    }

    private _identifier() : TokenIdentifier {
        let value = "";
        while(this._isChar(this._current())) {
            value += this._current();
            this._advance();
        }
        return {
            type: "Identifier",
            value
        }
    }

    private _number(): TokenNumberLiteral {
        let value = "";
        let hasDecimalPoint = false;
        
        if(this._isDecimalPoint(this._current())) {
            hasDecimalPoint = true;
            value = this._current();
            this._advance();
        }

        while(this._isNumber(this._current()) || this._isDecimalPoint(this._current())) {
            if(hasDecimalPoint && this._isDecimalPoint(this._current())) throw new UnknownTokenError(this._current(), this._pos + 1);
            if(this._isDecimalPoint(this._current())) {
                hasDecimalPoint = true;
            }
            value += this._current();
            this._advance();
        }
        return {
            type: "NumberLiteral",
            value: Number(value)
        }
    }

    private _leftParen() : TokenLeftParen {
        if(this._isLeftParen(this._current())) {
            this._advance();
        }
        return {
            type: "LeftParen",
            value: "("
        }
    }
    
    private _rightParen() : TokenRightParen {
        if(this._isRightParen(this._current())) {
            this._advance();
        }
        return {
            type: "RightParen",
            value: ")"
        }
    }

    private _comma() : TokenComma {
        if(this._isComma(this._current())) {
            this._advance();
        }
        return {
            type: "Comma",
            value: ","
        }
    }

    private _addOp(): TokenAddOp {
        if(this._isAddOp(this._current())) {
            this._advance();
        }
        return {
            type: "AddOp",
            value: "+"
        }
    }

    private _subOp(): TokenSubOp {
        if(this._isSubOp(this._current())) {
            this._advance();
        }
        return {
            type: "SubOp",
            value: "-"
        }
    }

    private _multOp(): TokenMultOp {
        if(this._isMultOp(this._current())) {
            this._advance();
        }
        return {
            type: "MultOp",
            value: "*"
        }
    }

    private _divOp(): TokenDivOp {
        if(this._isDivOp(this._current())) {
            this._advance();
        }
        return {
            type: "DivOp",
            value: "/"
        }
    }
    
}

export const REGEX = Object.freeze({
    CHAR: /[a-zA-Z]/,
    NUMBER: /[0-9]/,
    DECIMAL: /[\.]/,
    LEFT_PAREN: /[(]/,
    RIGHT_PAREN: /[)]/,
    COMMA: /[,]/,
    EMPTY_SPACE: /[\s\t\n\r]/,
    ADD_OP: /[\+]/,
    SUB_OP: /[\-]/,
    MULT_OP: /[\*]/,
    DIV_OP: /[\/]/
});
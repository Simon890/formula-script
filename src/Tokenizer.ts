import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { UnexpectedEndOfInput } from "./errors/UnexpectedEndOfInput";
import { UnknownTokenError } from "./errors/UnknownToken";
import { Token, TokenAddOp, TokenColon, TokenComma, TokenDateLiteral, TokenDivOp, TokenEqOp, TokenGtOp, TokenIdentifier, TokenLeftParen, TokenLtOp, TokenMultOp, TokenNotEqOp, TokenNumberLiteral, TokenPowOp, TokenRightParen, TokenStringLiteral, TokenSubOp } from "./types/tokens";
import { Config } from "./types/config";
dayjs.extend(customParseFormat);

export class Tokenizer {
    /**
     * Current position in string.
     */
    private _pos = 0;
    /**
     * Generated tokens.
     */
    private _tokens : Token[] = [];

    private readonly _config : Config;

    constructor(private _text : string, config : Config) {
        this._config = config;
    }

    /**
     * Iterates over a string and generates tokens.
     * @returns Array of tokens.
     */
    public tokenize() : Token[] {
        this._tokens = [];
        while(!this._isEOF()) {
            this._skipEmptySpace();
            const current = this._current();
            if(current == undefined) throw new UnexpectedEndOfInput();
            if(this._isChar(current)) {
                const identifier = this._identifier();
                const finalValue = this._config.isCaseSensitive ? identifier.value : identifier.value.toUpperCase();
                if(finalValue == "TRUE" || finalValue == "FALSE") {
                    this._tokens.push({
                        type: "BoolLiteral",
                        value: finalValue == "TRUE"
                    });
                } else {
                    this._tokens.push(identifier);
                }
                continue;
            }
            if(this._isNumber(current)) {
                if(this._config.useLiteralDate) {
                    const date = this._dateLiteral();
                    if(date) {
                        this._tokens.push(date);
                        continue;
                    }
                }
                const numberToken = this._numberOrIdentifier();
                this._tokens.push(numberToken);
                continue;
            }
            if(this._isDecimalPoint(current)) {
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
            if(this._isSimpleQuote(current) || this._isDoubleQuote(current)) {
                const stringToken = this._string(current);
                this._tokens.push(stringToken);
                continue;
            }
            if(this._isColon(current)) {
                const colon = this._colon();
                this._tokens.push(colon);
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
            if(this._isPow(current)) {
                this._tokens.push(this._powOp());
                continue;
            }
            if(this._isEqOp(current)) {
                this._tokens.push(this._eqOp());
                continue;
            }
            if(this._isNotEqOp(current)) {
                this._tokens.push(this._notEqOp());
                continue;
            }
            if(this._isGtOp(current)) {
                this._tokens.push(this._gtOp());
                continue;
            }
            if(this._isLtOp(current)) {
                this._tokens.push(this._ltOp());
                continue;
            }

            throw new UnknownTokenError(current, this._pos + 1);
        }
        this._tokens.push({
            type: "EOF",
            value: "EOF"
        });
        return this._tokens;
    }

    /**
     * @returns the current character.
     */
    private _current() : string {
        return this._text[this._pos];
    }

    /**
     * Moves to the next character.
     */
    private _advance() {
        this._pos++;
    }

    /**
     * Moves to the previous character.
     */
    private _goBack() {
        this._pos--;
    }

    /**
     * @returns true if it's at the end of the string
     */
    private _isEOF() : boolean {
        return this._pos >= this._text.length;
    }

    /**
     * Checks whether the string is a character.
     * @param value string.
     * @returns true if it's a character.
     */
    private _isChar(value : string) : boolean {
        return REGEX.CHAR.test(value);
    }

    /**
     * Checks whether the string is a number.
     * @param value string.
     * @returns true if it's a number.
     */
    private _isNumber(value: string): boolean {
        return REGEX.NUMBER.test(value);
    }

    /**
     * Checks whether the string is a left parenthesis.
     * @param value string.
     * @returns true if it's a left parenthesis.
     */
    private _isLeftParen(value: string): boolean {
        return REGEX.LEFT_PAREN.test(value);
    }

    /**
     * Checks whether the string is a right parenthesis.
     * @param value string.
     * @returns true if it's a right parenthesis.
     */
    private _isRightParen(value: string): boolean {
        return REGEX.RIGHT_PAREN.test(value);
    }

    /**
     * Checks whether the string is a comma.
     * @param value string.
     * @returns true if it's a comma.
     */
    private _isComma(value: string): boolean {
        return REGEX.COMMA.test(value);
    }

    /**
     * Checks whether the string is an empty space.
     * @param value string.
     * @returns true if it's a space, tab or line break.
     */
    private _isEmptySpace(value: string): boolean {
        return REGEX.EMPTY_SPACE.test(value);
    }

    /**
     * Checks whether the string is a decimal point.
     * @param value string.
     * @returns true if it's a decimal point.
     */
    private _isDecimalPoint(value: string): boolean {
        return REGEX.DECIMAL.test(value);
    }

    /**
     * Checks whether the string is an underscore.
     * @param value string.
     * @returns true if it's an underscore.
     */
    private _isUnderscore(value: string): boolean {
        return REGEX.UNDERSCORE.test(value);
    }

    /**
     * Checks whether the string is a plus sign.
     * @param value string.
     * @returns true if it's a plus sign.
     */
    private _isAddOp(value: string): boolean {
        return REGEX.ADD_OP.test(value);
    }

    /**
     * Checks whether the string is a minus sign.
     * @param value string.
     * @returns true if it's a minus sign.
     */
    private _isSubOp(value: string): boolean {
        return REGEX.SUB_OP.test(value);
    }

    /**
     * Checks whether the string is a multiplier operator.
     * @param value string.
     * @returns true if it's a multiplier operator.
     */
    private _isMultOp(value: string): boolean {
        return REGEX.MULT_OP.test(value);
    }

    /**
     * Checks whether the string is a divisor operator.
     * @param value string.
     * @returns true if it's a divisor operator.
     */
    private _isDivOp(value: string): boolean {
        return REGEX.DIV_OP.test(value);
    }

    /**
     * Checks whether the string is an equal operator.
     * @param value string.
     * @returns true if it's an equal operator.
     */
    private _isEqOp(value: string): boolean {
        return REGEX.EQ_OP.test(value);
    }

    /**
     * Checks whether the string is an equal operator.
     * @param value string.
     * @returns true if it's a not equal operator.
     */
    private _isNotEqOp(value: string): boolean {
        return REGEX.NOT_EQ_OP.test(value);
    }

    /**
     * Checks whether the string is a greater than operator.
     * @param value string.
     * @returns true if it's a greater than operator.
     */
    private _isGtOp(value: string): boolean {
        return REGEX.GT_OP.test(value);
    }

    /**
     * Checks whether the string is a less than operator.
     * @param value string.
     * @returns true if it's a less than operator.
     */
    private _isLtOp(value: string): boolean {
        return REGEX.LT_OP.test(value);
    }

    /**
     * Checks whether the string is a double quote.
     * @param value string.
     * @returns true if it's a double quote.
     */
    private _isDoubleQuote(value: string): boolean {
        return REGEX.DOUBLE_QUOTE.test(value);
    }

    /**
     * Checks whether the string is a simple quote.
     * @param value string.
     * @returns true if it's a simple quote.
     */
    private _isSimpleQuote(value: string): boolean {
        return REGEX.SIMPLE_QUOTE.test(value);
    }

    /**
     * Checks whether the string is a colon.
     * @param value string.
     * @returns true if it's a colon.
     */
    private _isColon(value: string): boolean {
        return REGEX.COLON.test(value);
    }

    private _isPow(value : string) : boolean {
        return REGEX.POW_OP.test(value);
    }

    /**
     * Skips empty spaces and moves the position.
     */
    private _skipEmptySpace() {
        while(this._isEmptySpace(this._current())) {
            this._advance();
        }
    }

    /**
     * @returns TokenIdentifier
     */
    private _identifier() : TokenIdentifier {
        let value = "";
        while(!this._isEOF() && (this._isChar(this._current()) || this._isNumber(this._current()) || this._isDecimalPoint(this._current()) || this._isUnderscore(this._current()))) {
            value += this._current();
            this._advance();
        }
        return {
            type: "Identifier",
            value
        }
    }

    /**
     * @returns TokenNumberLiteral
     */
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

    private _dateLiteral() : TokenDateLiteral | null {
        let num = this._current();
        this._advance();

        const restart = () => {
            for (let i = 0; i < num.length; i++) {
                this._goBack();
            }
            return null;
        }

        while(num.length < 4) {
            if(this._isNumber(this._current())) {
                num += this._current();
                this._advance();
            } else {
                return restart();
            }
        }

        if(num.length != 4) return restart();

        if(!this._isDivOp(this._current())) return restart();
        
        num += this._current(); // yyyy/ length = 5
        this._advance();
        
        if(this._isNumber(this._current())) {
            num += this._current(); // yyyy/m
            this._advance();
            if(this._isNumber(this._current())) {
                num += this._current(); // yyyy/mm
                this._advance();
                
                if(!this._isDivOp(this._current())) return restart();
                
                num += this._current(); // yyyy/mm/
                this._advance();
                
                if(this._isNumber(this._current())) {
                    num += this._current(); // yyyy/mm/d
                    this._advance();
                    if(this._isNumber(this._current())) {
                        num += this._current(); // yyyy/mm/dd
                        this._advance();
                        if(!this._isNumber(this._current())) {
                            if(dayjs(num, "YYYY/MM/DD", true).isValid()) return {
                                type: "DateLiteral",
                                value: num
                            }
                            return restart();
                        }
                        return restart();
                    }
                    return restart();
                }
            }
        }
        return restart();
    }

    /**
     * @returns TokenNumberLiteral | TokenIdentifier
     */
    private _numberOrIdentifier() : TokenNumberLiteral | TokenIdentifier {
        let value = "";
        let hasDecimalPoint = false;
        let isIdentifier = false;
        
        if(this._isDecimalPoint(this._current())) {
            hasDecimalPoint = true;
            value = this._current();
            this._advance();
        }

        while(this._isNumber(this._current()) || this._isDecimalPoint(this._current())) {
            if(!isIdentifier && hasDecimalPoint && this._isDecimalPoint(this._current())) throw new UnknownTokenError(this._current(), this._pos + 1);
            if(this._isDecimalPoint(this._current())) {
                hasDecimalPoint = true;
            }
            if(this._isChar(this._current())) {
                isIdentifier = true;
                value = String(value);
            }
            value += this._current();
            this._advance();
        }
        if(isIdentifier) return {
            type: "Identifier",
            value
        }
        return {
            type: "NumberLiteral",
            value: Number(value)
        }
    }

    /**
     * @returns TokenLeftParen
     */
    private _leftParen() : TokenLeftParen {
        if(this._isLeftParen(this._current())) {
            this._advance();
        }
        return {
            type: "LeftParen",
            value: "("
        }
    }
    
    /**
     * @returns TokenRightParen
     */
    private _rightParen() : TokenRightParen {
        if(this._isRightParen(this._current())) {
            this._advance();
        }
        return {
            type: "RightParen",
            value: ")"
        }
    }

    /**
     * @returns TokenComma
     */
    private _comma() : TokenComma {
        if(this._isComma(this._current())) {
            this._advance();
        }
        return {
            type: "Comma",
            value: ","
        }
    }

    /**
     * @returns TokenAddOp
     */
    private _addOp(): TokenAddOp {
        if(this._isAddOp(this._current())) {
            this._advance();
        }
        return {
            type: "AddOp",
            value: "+"
        }
    }

    /**
     * @returns TokenSubOp
     */
    private _subOp(): TokenSubOp {
        if(this._isSubOp(this._current())) {
            this._advance();
        }
        return {
            type: "SubOp",
            value: "-"
        }
    }

    /**
     * @returns TokenMultOp
     */
    private _multOp(): TokenMultOp {
        if(this._isMultOp(this._current())) {
            this._advance();
        }
        return {
            type: "MultOp",
            value: "*"
        }
    }

    private _powOp() : TokenPowOp {
        if(this._isPow(this._current())) {
            this._advance();
        }
        return {
            type: "PowOp",
            value: "^"
        }
    }

    /**
     * @returns TokenDivOp
     */
    private _divOp(): TokenDivOp {
        if(this._isDivOp(this._current())) {
            this._advance();
        }
        return {
            type: "DivOp",
            value: "/"
        }
    }

    /**
     * @returns TokenEqOp
     */
    private _eqOp() : TokenEqOp {
        if(this._isEqOp(this._current())) {
            this._advance();
        }
        return {
            type: "EqOp",
            value: "="
        }
    }

    /**
     * @returns TokenNotEqOp
     */
    private _notEqOp() : TokenNotEqOp {
        if(this._isNotEqOp(this._current())) {
            this._advance();
            this._advance();
        }
        return {
            type: "NotEqOp",
            value: "!="
        }
    }

    /**
     * @returns TokenGtOp
     */
    private _gtOp(): TokenGtOp {
        if(this._isGtOp(this._current())) {
            this._advance();
        }
        return {
            type: "GtOp",
            value: ">"
        }
    }

    /**
     * @returns TokenLtOp
     */
    private _ltOp(): TokenLtOp {
        if(this._isLtOp(this._current())) {
            this._advance();
        }
        return {
            type: "LtOp",
            value: "<"
        }
    }

    /**
     * @param quote Double quote or single quote.
     * @returns TokenStringLiteral.
     */
    private _string(quote : string) : TokenStringLiteral {
        this._advance();
        let value = "";
        while(this._current() != quote) {
            if(this._isEOF()) throw new UnexpectedEndOfInput();
            value += this._current();
            this._advance();
        }
        this._advance();
        return {
            type: "StringLiteral",
            value
        }
    }

    /**
     * @returns TokenColon
     */
    private _colon(): TokenColon {
        if(this._current() == ":") {
            this._advance();
        }
        return {
            type: "Colon",
            value: ":"
        }
    }
    
}

/**
 * Regular expressions.
 */
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
    DIV_OP: /[\/]/,
    POW_OP: /[\^]/,
    EQ_OP: /[\=]/,
    NOT_EQ_OP: /[!=]/,
    GT_OP: /[\>]/,
    LT_OP: /[\<]/,
    DOUBLE_QUOTE: /["]/,
    SIMPLE_QUOTE: /[']/,
    COLON: /[:]/,
    UNDERSCORE: /[_]/
});
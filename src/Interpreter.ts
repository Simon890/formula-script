import { CantAddBoolValue } from "./errors/CantAddBoolValue";
import { ExpectedValueNotMatch } from "./errors/ExpectedValueNotMatch";
import { Parser } from "./Parser";
import { Tokenizer } from "./Tokenizer";
import { AST } from "./types/ast";
import { BinaryExpression, Token } from "./types/tokens";

export class Interpreter {
    private _ast !: AST;

    constructor() {
    }
    
    public run(str : string) {
        const tokenizer = new Tokenizer(str);
        const parser = new Parser(tokenizer.tokenize());
        this._ast = parser.parse();
        let expr : string | number | boolean | null = null;
        for (let i = 0; i < this._ast.body.length; i++) {
            const token = this._ast.body[i];
            if(token.type == "NumberLiteral") {
                expr = Number(token.value);
                continue;
            }
            if(token.type == "StringLiteral") {
                expr = String(token.value);
                continue;
            }
            if(token.type == "BinaryExpression") {
                expr = this._binaryExpression(token);
                continue;
            }
        }
        return expr;
    }

    private _binaryExpression(token : Token) : number | boolean | string {
        if(token.type == "NumberLiteral") return Number(token.value);
        if(token.type == "StringLiteral") return String(token.value);
        if(token.type == "BinaryExpression") {
            if(token.operator == "+") return this.__addition(token);
            if(token.operator == "-") return this._checkNumeric(this._binaryExpression(token.left)) - this._checkNumeric(this._binaryExpression(token.right));
            if(token.operator == "*") return this._checkNumeric(this._binaryExpression(token.left)) * this._checkNumeric(this._binaryExpression(token.right));
            if(token.operator == "/") return this._checkNumeric(this._binaryExpression(token.left)) / this._checkNumeric(this._binaryExpression(token.right));
            if(token.operator == "=") return this._binaryExpression(token.left) === this._binaryExpression(token.right);
            if(token.operator == ">") return this._binaryExpression(token.left) > this._binaryExpression(token.right);
            if(token.operator == "<") return this._binaryExpression(token.left) < this._binaryExpression(token.right);
            if(token.operator == ">=") return this._binaryExpression(token.left) >= this._binaryExpression(token.right);
            if(token.operator == "<=") return this._binaryExpression(token.left) <= this._binaryExpression(token.right);
        }
        throw new Error(`Unexpected token ${token.type}`);
    }

    private __addition(token: BinaryExpression) : number | string {
        const leftExpression = this._binaryExpression(token.left);
        const rightExpression = this._binaryExpression(token.right);
        if(this._isBoolean(leftExpression)) throw new CantAddBoolValue();
        if(this._isBoolean(rightExpression)) throw new CantAddBoolValue();
        if(this._isString(leftExpression) || this._isString(rightExpression)) return String(leftExpression) + String(rightExpression);
        return leftExpression + rightExpression;
    }

    private _checkNumeric(val: any) : number {
        if(typeof val != "number") throw new ExpectedValueNotMatch("numeric", val);
        return val;
    }

    private _isString(val : any) : val is string {
        return typeof val == "string";
    }

    private _isBoolean(val: any) : val is boolean {
        return typeof val == "boolean";
    }
}
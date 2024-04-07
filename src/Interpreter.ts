import { Arguments } from "./Arguments";
import { CantAddBoolValue } from "./errors/CantAddBoolValue";
import { CantAddDateValue } from "./errors/CantAddDateValue";
import { ExpectedValueNotMatch } from "./errors/ExpectedValueNotMatch";
import { MissingArguments } from "./errors/MissingArguments";
import { NoHandlerSet } from "./errors/NoHandlerSet";
import { FormulaFunction } from "./FormulaFunction";
import { Abs } from "./func/Abs";
import { Avg } from "./func/Avg";
import { AvgRange } from "./func/AvgRange";
import { Bool } from "./func/Bool";
import { Choose } from "./func/Choose";
import { ChooseRange } from "./func/ChooseRange";
import { Concat } from "./func/Concat";
import { DateFunction } from "./func/DateFunction";
import { Day } from "./func/Day";
import { If } from "./func/If";
import { Max } from "./func/Max";
import { Median } from "./func/Median";
import { Min } from "./func/Min";
import { Mode } from "./func/Mode";
import { Month } from "./func/Month";
import { Num } from "./func/Num";
import { Pow } from "./func/Pow";
import { Random } from "./func/Random";
import { Round } from "./func/Round";
import { Sqrt } from "./func/Sqrt";
import { Str } from "./func/Str";
import { Sum } from "./func/Sum";
import { SumRange } from "./func/SumRange";
import { Today } from "./func/Today";
import { Year } from "./func/Year";
import { FunctionsRegistry } from "./FunctionsRegistry";
import { Parser } from "./Parser";
import { RangeHandler } from "./RangeHandler";
import { Tokenizer } from "./Tokenizer";
import { AST } from "./types/ast";
import { ObjectRangeHandler, Range, RangeHandlerClassFunction } from "./types/range";
import { BinaryExpression, Token, TokenFunctionCall, TokenRange } from "./types/tokens";
import { ValidType } from "./types/validTypes";

export class Interpreter {
    private _ast !: AST;
    private _registry : FunctionsRegistry;
    private _rangeHandler ?: ObjectRangeHandler | null;

    constructor() {
        this._registry = new FunctionsRegistry();
        this._registry.register("SUM", new Sum);
        this._registry.register("SUMRANGE", new SumRange);
        this._registry.register("AVG", new Avg);
        this._registry.register("AVGRANGE", new AvgRange);
        this._registry.register("RANDOM", new Random);
        this._registry.register("ABS", new Abs);
        this._registry.register("CHOOSE", new Choose);
        this._registry.register("CHOOSERANGE", new ChooseRange);
        this._registry.register("MAX", new Max);
        this._registry.register("MIN", new Min);
        this._registry.register("IF", new If);
        this._registry.register("ROUND", new Round);
        this._registry.register("MEDIAN", new Median);
        this._registry.register("MODE", new Mode);
        this._registry.register("POW", new Pow);
        this._registry.register("SQRT", new Sqrt);
        this._registry.register("STR", new Str);
        this._registry.register("NUM", new Num);
        this._registry.register("BOOL", new Bool);
        this._registry.register("DATE", new DateFunction);
        this._registry.register("TODAY", new Today);
        this._registry.register("YEAR", new Year);
        this._registry.register("MONTH", new Month);
        this._registry.register("DAY", new Day);
        this._registry.register("CONCAT", new Concat);
    }
    
    /**
     * Interprets the code.
     * @param str code.
     * @param rebuildAST True if it's needed to rebuild de AST.
     * @returns an expression.
     */
    public run(str : string, rebuildAST = true) {
        if(rebuildAST || this._ast == null) {
            const tokenizer = new Tokenizer(str);
            const parser = new Parser(tokenizer.tokenize());
            this._ast = parser.parse();
        }
        let expr : ValidType | null = null;
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
            if(token.type == "BoolLiteral") {
                expr = Boolean(token.value);
                continue;
            }
            if(token.type == "BinaryExpression") {
                expr = this._binaryExpression(token);
                continue;
            }
            if(token.type == "FunctionCall") {
                expr = this._functionCall(token);
            }
        }
        return expr;
    }

    /**
     * Set the range handler to use.
     * @param handler A function or a class that extends RangeHandler class.
     */
    public setRangeHandler(handler : RangeHandlerClassFunction) {
        if(handler instanceof RangeHandler) this._rangeHandler = handler;
        else this._rangeHandler = {handle: handler};
    }

    /**
     * FunctionsRegistry
     */
    public get registry() {
        return this._registry;
    }

    /**
     * Resolve a binary expression.
     * @param token Token.
     * @returns ValidType.
     */
    private _binaryExpression(token : Token) : ValidType {
        if(token.type == "NumberLiteral") return Number(token.value);
        if(token.type == "StringLiteral") return String(token.value);
        if(token.type == "FunctionCall") return this._functionCall(token);
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
            if(token.operator == "!=") return this._binaryExpression(token.left) != this._binaryExpression(token.right);
        }
        throw new Error(`Unexpected token ${token.type}`);
    }

    /**
     * Interprets an addition.
     * @param token BinaryExpression.
     * @returns number or string.
     */
    private __addition(token: BinaryExpression) : number | string {
        const leftExpression = this._binaryExpression(token.left);
        const rightExpression = this._binaryExpression(token.right);
        if(this._isBoolean(leftExpression)) throw new CantAddBoolValue();
        if(this._isBoolean(rightExpression)) throw new CantAddBoolValue();
        if(this._isDate(leftExpression)) throw new CantAddDateValue();
        if(this._isDate(rightExpression)) throw new CantAddDateValue();
        if(this._isString(leftExpression) || this._isString(rightExpression)) return String(leftExpression) + String(rightExpression);
        return leftExpression + rightExpression;
    }

    /**
     * Interprets a range and return its value by using the RangeHandler.
     * @param token TokenRange.
     * @returns Range.
     */
    private _range(token : TokenRange) : Range {
        if(this._rangeHandler === null || this._rangeHandler === undefined) throw new NoHandlerSet();
        return this._rangeHandler.handle(token.left, token.right);
    }

    /**
     * Performs a function call and return its value.
     * @param token TokenFunctionCall.
     * @returns ValidType.
     */
    private _functionCall(token: TokenFunctionCall) : ValidType {
        const identifier = token.value;
        const args = token.args.map(arg => {
            if(arg.type == "FunctionCall") return this._functionCall(arg);
            if(arg.type == "Range") return this._range(arg);
            if(arg.type == "BinaryExpression") return this._binaryExpression(arg);
            return arg.value;
        });
        const formulaFunction = this._registry.get(identifier);
        let numParams = undefined;
        if(formulaFunction instanceof FormulaFunction) numParams = formulaFunction.numParams();
        else if(formulaFunction.numParams) {
            if(typeof formulaFunction.numParams == "function") numParams = formulaFunction.numParams();
            else numParams = formulaFunction.numParams;
        }
        if(numParams !== undefined && numParams !== null && numParams != args.length) throw new MissingArguments(identifier, numParams, args.length);
            return formulaFunction.call(new Arguments(args));
    }

    /**
     * Checks whether the value is a number. If not it throws an error.
     * @param val any.
     * @throws ExpectedValueNotMatch.
     * @returns the value passed as argument.
     */
    private _checkNumeric(val: any) : number {
        if(typeof val != "number") throw new ExpectedValueNotMatch("numeric", val);
        return val;
    }

    /**
     * Checks whether the value is string type.
     * @param val any.
     * @returns true if it's a string.
     */
    private _isString(val : any) : val is string {
        return typeof val == "string";
    }

    /**
     * Checks whether the value is boolean type.
     * @param val any.
     * @returns true if it's a boolean.
     */
    private _isBoolean(val: any) : val is boolean {
        return typeof val == "boolean";
    }

    /**
     * Checks whether the value is date type.
     * @param val any.
     * @returns true if it's a Date.
     */
    private _isDate(val: any): val is Date {
        return val instanceof Date;
    }
}
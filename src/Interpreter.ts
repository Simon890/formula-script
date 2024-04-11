import { Arguments } from "./Arguments";
import { CellReferenceHandler } from "./CellReferenceHandler";
import { BinaryOperationError } from "./errors/BinaryOperationError";
import { CellRefError } from "./errors/CellRefError";
import { ExpectedValueNotMatch } from "./errors/ExpectedValueNotMatch";
import { MissingArguments } from "./errors/MissingArguments";
import { NoCellReferenceHandlerSet } from "./errors/NoCellReferenceHandlerSet";
import { NoRangeHandlerSet } from "./errors/NoRangeHandlerSet";
import { UnexpectedAsyncCellRefHandler } from "./errors/UnexpectedAsyncCellRefHandler";
import { UnexpectedAsyncRangeHandler } from "./errors/UnexpectedAsyncRangeHandler";
import { UnexpectedAsyncFunction } from "./errors/UnexpectedAsynFunction";
import { UnexpectedToken } from "./errors/UnexpectedToken";
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
import { BoolAddBool } from "./func/magic/BoolAddBool";
import { DateAddNumber } from "./func/magic/DateAddNumber";
import { DateEqDate } from "./func/magic/DateEqDate";
import { DateGtDate } from "./func/magic/DateGtDate";
import { DateGteDate } from "./func/magic/DateGteDate";
import { DateLtDate } from "./func/magic/DateLtDate";
import { DateLteDate } from "./func/magic/DateLteDate";
import { NumberAddDate } from "./func/magic/NumberAddDate";
import { NumberAddNumber } from "./func/magic/NumberAddNumber";
import { NumberAddString } from "./func/magic/NumberAddString";
import { NumberDivNumber } from "./func/magic/NumberDivNumber";
import { NumberEqNumber } from "./func/magic/NumberEqNumber";
import { NumberEqString } from "./func/magic/NumberEqString";
import { NumberGteNumber } from "./func/magic/NumberGteNumber";
import { NumberGtNumber } from "./func/magic/NumberGtNumber";
import { NumberLteNumber } from "./func/magic/NumberLteNumber";
import { NumberLtNumber } from "./func/magic/NumberLtNumber";
import { NumberMulNumber } from "./func/magic/NumberMulNumber";
import { NumberPowNumber } from "./func/magic/NumberPowNumber";
import { NumberSubNumber } from "./func/magic/NumberSubNumber";
import { StringAddNumber } from "./func/magic/StringAddNumber";
import { StringAddString } from "./func/magic/StringAddString";
import { StringEqString } from "./func/magic/StringEqString";
import { StringGteString } from "./func/magic/StringGteString";
import { StringGtString } from "./func/magic/StringGtString";
import { StringLteString } from "./func/magic/StringLteString";
import { StringLtString } from "./func/magic/StringLtString";
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
import { TodayDate } from "./TodayDate";
import { Tokenizer } from "./Tokenizer";
import { AST } from "./types/ast";
import { CellRefHandlerClassFunction, ObjectCellRefHandler } from "./types/cellRef";
import { ObjectRangeHandler, Range, RangeHandlerClassFunction } from "./types/range";
import { Token, TokenBoolLiteral, TokenFunctionCall, TokenIdentifier, TokenNumberLiteral, TokenRange, TokenStringLiteral, UnaryExpression } from "./types/tokens";
import { ValidType } from "./types/validTypes";

export class Interpreter {
    private _ast !: AST;
    private _registry : FunctionsRegistry;
    private _rangeHandler ?: ObjectRangeHandler | null;
    private _cellReferenceHandler ?: ObjectCellRefHandler | null;
    private _opToStr : {
        [key : string]: string
    } = {
        "+": "ADD",
        "-": "SUB",
        "*": "MUL",
        "/": "DIV",
        "=": "EQ",
        "^": "POW",
        "!=": "EQ",
        ">": "GT",
        ">=": "GTE",
        "<": "LT",
        "<=": "LTE"
    }
    private _opToAction : {
        [key : string]: string
    } = {
        "+": "Addition",
        "-": "Subtraction",
        "*": "Multiplication",
        "/": "Division",
        "=": "Equal comparison",
        "^": "Power",
        ">": "Greater than comparison",
        ">=": "Greater or equal than comparison",
        "<": "Less than comparison",
        "<=": "Less or equal than comparison"
    }
    private _typeToStr = {
        "number": "NUMBER",
        "string": "STRING",
        "date": "DATE",
        "boolean": "BOOL",
        "range": "RANGE"
    }

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

        // ### MAGIC FUNCTIONS ###
        // Number
        this._registry.register("_NUMBER_EQ_NUMBER", new NumberEqNumber);
        this._registry.register("_NUMBER_GT_NUMBER", new NumberGtNumber);
        this._registry.register("_NUMBER_GTE_NUMBER", new NumberGteNumber);
        this._registry.register("_NUMBER_LT_NUMBER", new NumberLtNumber);
        this._registry.register("_NUMBER_LTE_NUMBER", new NumberLteNumber);
        this._registry.register("_NUMBER_ADD_NUMBER", new NumberAddNumber);
        this._registry.register("_NUMBER_SUB_NUMBER", new NumberSubNumber);
        this._registry.register("_NUMBER_MUL_NUMBER", new NumberMulNumber);
        this._registry.register("_NUMBER_DIV_NUMBER", new NumberDivNumber);
        this._registry.register("_NUMBER_POW_NUMBER", new NumberPowNumber);

        // String
        this._registry.register("_STRING_EQ_STRING", new StringEqString);
        this._registry.register("_STRING_GT_STRING", new StringGtString);
        this._registry.register("_STRING_GTE_STRING", new StringGteString);
        this._registry.register("_STRING_LT_STRING", new StringLtString);
        this._registry.register("_STRING_LTE_STRING", new StringLteString);
        this._registry.register("_STRING_ADD_STRING", new StringAddString);

        // Boolean
        this._registry.register("_BOOL_EQ_BOOL", new BoolAddBool);

        // Date
        this._registry.register("_DATE_EQ_DATE", new DateEqDate);
        this._registry.register("_DATE_GT_DATE", new DateGtDate);
        this._registry.register("_DATE_GTE_DATE", new DateGteDate);
        this._registry.register("_DATE_LT_DATE", new DateLtDate);
        this._registry.register("_DATE_LTE_DATE", new DateLteDate);

        // Combination
        this._registry.register("_NUMBER_ADD_STRING", new NumberAddString);
        this._registry.register("_STRING_ADD_NUMBER", new StringAddNumber);
        this._registry.register("_NUMBER_EQ_STRING", new NumberEqString);
        this._registry.register("_NUMBER_ADD_DATE", new NumberAddDate);
        this._registry.register("_DATE_ADD_NUMBER", new DateAddNumber);
        // ### END MAGIC FUNCTIONS ###
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
            expr = this._initialExpression(token);
        }
        TodayDate.reset();
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
     * Set the cell reference handler to use.
     * @param handler A function or a class that extends CellReferenceHandler class.
     */
    public setCellRefHandler(handler : CellRefHandlerClassFunction) {
        if(handler instanceof CellReferenceHandler) this._cellReferenceHandler = handler;
        else this._cellReferenceHandler = {handle: handler};
    }

    /**
     * FunctionsRegistry
     */
    public get registry() {
        return this._registry;
    }

    private _numberLiteral(token: TokenNumberLiteral) : number {
        return Number(token.value);
    }

    private _stringLiteral(token : TokenStringLiteral) : string {
        return String(token.value);
    }

    private _boolLiteral(token : TokenBoolLiteral) : boolean {
        return Boolean(token.value);
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
        if(token.type == "Identifier") return this._cellReference(token);
        if(token.type == "UnaryExpression") return this._unaryExpression(token);
        if(token.type == "Range") return this._range(token);
        if(token.type == "BinaryExpression") {
            const leftValue = this._binaryExpression(token.left);
            const rightValue = this._binaryExpression(token.right);
            return this._callMagicFunction(leftValue, token.operator, rightValue);
        }
        throw new Error(`Unexpected token ${token.type}`);
    }

    private _initialExpression(token : Token) : ValidType {
        if(token.type == "NumberLiteral") return this._numberLiteral(token);
        if(token.type == "StringLiteral") return this._stringLiteral(token);
        if(token.type == "Identifier") return this._cellReference(token);
        if(token.type == "BoolLiteral") return this._boolLiteral(token);
        if(token.type == "UnaryExpression") return this._unaryExpression(token);
        if(token.type == "BinaryExpression") return this._binaryExpression(token);
        if(token.type == "FunctionCall") return this._functionCall(token);
        if(token.type == "Range") return this._range(token);
        throw new UnexpectedToken(["NumberLiteral", "StringLiteral", "Identifier", "BoolLiteral", "BinaryExpression", "FunctionCall", "Range"], token.type, 0);
    }

    private _unaryExpression(token : UnaryExpression) : ValidType {
        const value = this._binaryExpression(token.value);
        this._checkNumeric(value)
        return (value as number) * (token.operator == "-" ? -1 : 1);
    }

    /**
     * Interprets a range and return its value by using the RangeHandler.
     * @param token TokenRange.
     * @returns Range.
     */
    private _range(token : TokenRange) : Range {
        if(this._rangeHandler === null || this._rangeHandler === undefined) throw new NoRangeHandlerSet();
        const value = this._rangeHandler.handle(token.left, token.right, this._rangeError);
        if(value instanceof Promise) throw new UnexpectedAsyncRangeHandler();
        return value;
    }

    /**
     * Access a cell reference and returns its value by using the CellReferenceHandler.
     * @param token TokenRange.
     * @returns Range.
     */
    private _cellReference(token : TokenIdentifier) : ValidType {
        if(this._cellReferenceHandler === null || this._cellReferenceHandler === undefined) throw new NoCellReferenceHandlerSet();
        const value = this._cellReferenceHandler.handle(token.value, this._cellRefError);
        if(value instanceof Promise) throw new UnexpectedAsyncCellRefHandler();
        return value;
    }

    /**
     * Performs a function call and return its value.
     * @param token TokenFunctionCall.
     * @returns ValidType.
     */
    private _functionCall(token: TokenFunctionCall) : ValidType {
        const identifier = token.value;
        const args = token.args.map(arg => this._initialExpression(arg));
        const formulaFunction = this._registry.get(identifier);
        let numParams = undefined;
        if(formulaFunction instanceof FormulaFunction) numParams = formulaFunction.numParams();
        else if(formulaFunction.numParams) {
            if(typeof formulaFunction.numParams == "function") numParams = formulaFunction.numParams();
            else numParams = formulaFunction.numParams;
        }
        if(numParams !== undefined && numParams !== null && numParams != args.length) throw new MissingArguments(identifier, numParams, args.length);
        const value = formulaFunction.call(new Arguments(args));
        if(value instanceof Promise) throw new UnexpectedAsyncFunction(identifier);
        return value;
    }

    private _callMagicFunction(leftValue : ValidType, operator : string, rightValue : ValidType) : ValidType {
        const operatorStr = this._operatorToString(operator);
        const leftStr = this._typeToString(leftValue);
        const rightStr = this._typeToString(rightValue);
        let name = "_" + leftStr + "_" + operatorStr + "_" + rightStr;
        if(!this._registry.has(name)) throw new BinaryOperationError(this._opToAction[operator], leftStr, rightStr);
        const formulaFunction = this._registry.get(name);
        const returnValue = formulaFunction.call(new Arguments([leftValue, rightValue]));
        if(returnValue instanceof Promise) throw new UnexpectedAsyncFunction(name);
        return operator == "!=" ? !returnValue : returnValue;
    }
    
    private _operatorToString(operator : keyof typeof this._opToStr) {
        if(!(operator in this._opToStr)) throw new Error("Unknown operator");
        return this._opToStr[operator];
    }

    private _typeToString(value : ValidType) : string {
        const type = typeof value;
        if(type in this._typeToStr) return this._typeToStr[type as keyof typeof this._typeToStr];
        if(this._isDate(value)) return this._typeToStr["date"];
        if(this._isRange(value)) return this._typeToStr["range"];
        throw new Error("Invalid type");
    }

    /**
     * Checks whether the value is a number. If not it throws an error.
     * @param val any.
     * @throws ExpectedValueNotMatch.
     * @returns the value passed as argument.
     */
    private _checkNumeric(val: any) : asserts val is number {
        if(typeof val != "number") throw new ExpectedValueNotMatch("numeric", val);
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

    /**
     * Checks whether  the value is a range.
     * @param val any.
     * @returns true if it's a range
     */
    private _isRange(val: any): val is Range {
        return Array.isArray(val);
    }

    /**
     * Checks whether  the value is a number.
     * @param val any.
     * @returns true if it's a number
     */
    private _isNumber(val: any) : val is number {
        return typeof val == "number";
    }

    /**
     * Throws an error when the range is not valid.
     * @param message error message.
     */
    private _rangeError(message : string) : never {
        throw new RangeError(message);
    }

    /**
     * Throws an error when the cell reference is not valid.
     * @param message error message.
     */
    private _cellRefError(message : string) : never {
        throw new CellRefError(message);
    }
}
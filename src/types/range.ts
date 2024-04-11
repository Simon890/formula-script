import { RangeHandler } from "../RangeHandler"
import { ValidType } from "./validTypes";

export type Range = Array<ValidType>;

export type RangeHandlerFunction = ((left : string, right : string, fail : (message : string) => never) => Range | Promise<Range>);

export type RangeHandlerClassFunction = RangeHandler | RangeHandlerFunction;

export type ObjectRangeHandler = RangeHandler | {handle: RangeHandlerFunction};
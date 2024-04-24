import { RangeHandler } from "../RangeHandler"
import { FailFunction } from "./failCb";
import { ValidType } from "./validTypes";

export type Range = Array<ValidType>;

export type RangeHandlerFunction = ((left : string, right : string, fail : FailFunction) => Range | Promise<Range>);

export type RangeHandlerClassFunction = RangeHandler | RangeHandlerFunction;

export type ObjectRangeHandler = RangeHandler | {handle: RangeHandlerFunction};
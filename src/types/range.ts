import { RangeHandler } from "../RangeHandler"

export type Range = Array<string | boolean | number>;

export type RangeHandlerFunction = (left : string, right : string) => Range;

export type RangeHandlerClassFunction = RangeHandler | RangeHandlerFunction;

export type ObjectRangeHandler = RangeHandler | {handle: RangeHandlerFunction};
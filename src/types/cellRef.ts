import { CellReferenceHandler } from "../CellReferenceHandler";
import { FailFunction } from "./failCb";
import { ValidType } from "./validTypes";

export type CellRefHandlerFunction = ((cellName : string, fail : FailFunction) => ValidType | Promise<ValidType>);

export type CellRefHandlerClassFunction = CellReferenceHandler | CellRefHandlerFunction;

export type ObjectCellRefHandler = CellReferenceHandler | {handle : CellRefHandlerFunction};
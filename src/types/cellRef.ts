import { CellReferenceHandler } from "../CellReferenceHandler";
import { ValidType } from "./validTypes";

export type CellRefHandlerFunction = ((cellName : string, fail : (message : string) => never) => ValidType | Promise<ValidType>);

export type CellRefHandlerClassFunction = CellReferenceHandler | CellRefHandlerFunction;

export type ObjectCellRefHandler = CellReferenceHandler | {handle : CellRefHandlerFunction};
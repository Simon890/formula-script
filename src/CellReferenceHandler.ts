import { ValidType } from "./types/validTypes";

export abstract class CellReferenceHandler {

    public abstract handle(cellName : string) : ValidType;
}
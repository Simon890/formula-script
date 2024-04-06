import { Range } from "./types/range";

export abstract class RangeHandler {

    public abstract handle(left : string, right : string) : Range;
}
import { Range } from "./types/range";

export abstract class RangeHandler {

    /**
     * Determines the way to handle ranges
     * @param left left side of a range.
     * @param right right side of a range.
     * @returns Range.
     */
    public abstract handle(left : string, right : string) : Range;
}
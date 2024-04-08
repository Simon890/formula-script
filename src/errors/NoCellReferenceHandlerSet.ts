export class NoCellReferenceHandlerSet extends Error {
    constructor() {
        super("No cell reference handler set. Use 'setCellRefHandler' to set your handler");
    }
}
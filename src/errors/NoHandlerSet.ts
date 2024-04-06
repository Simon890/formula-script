export class NoHandlerSet extends Error {
    constructor() {
        super("No range handler has been set. Use 'setRangeHandler' to set your handler");
    }
}
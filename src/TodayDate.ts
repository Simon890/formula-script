export class TodayDate extends Date {
    private static _date : Date | null = null;
    constructor() {
        if(TodayDate._date == null) TodayDate._date = new Date();
        super(TodayDate._date);
    }

    public static reset() {
        TodayDate._date = null;
    }
}
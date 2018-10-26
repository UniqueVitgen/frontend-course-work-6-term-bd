import { DatePipe } from "@angular/common";
import { Inject, LOCALE_ID } from "@angular/core";

export class DateTimeWorker {
    public datePipe: DatePipe;
    constructor(
        @Inject(LOCALE_ID) private locale: string) {
            this.datePipe = new DatePipe(locale);
    }

    getTime(dateWithTime, format?) {
        let date = new Date(dateWithTime);
        if (format == null) {
            format = 'H:mm';
        }
        return this.datePipe.transform(date, format);
    }

    getDate(dateWithTime, format?) {
        if (dateWithTime) {
            // console.log('date - ', dateWithTime);
            let date = new Date(dateWithTime);
            if (format == null) {
                format = 'yyyy-MM-dd';
            }
            return this.datePipe.transform(date, format);
        }
    }
}
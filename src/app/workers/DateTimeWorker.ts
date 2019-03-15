import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';

export class DateTimeWorker {
    public datePipe: DatePipe;
    constructor(
        @Inject(LOCALE_ID) private locale: string) {
            this.datePipe = new DatePipe(locale);
    }

    getTime(dateWithTime, format?) {
        const date = new Date(dateWithTime);
        if (format == null) {
            format = 'H:mm';
        }
        return this.datePipe.transform(date, format);
    }
    compare(date, date2): number {
      const dateObj = new Date(date);
      const date2Obj = new Date(date2);
      console.log(dateObj, date2Obj);
      return dateObj > date2Obj ? 1 : (dateObj === date2Obj ? 0 : -1);
    }
    compareDates(date, date2): number {
      const dateString = this.getDate(new Date(date));
      const date2String = this.getDate(new Date(date2));
      return dateString > date2String ? 1 : (dateString === date2String ? 0 : -1);
    }

    getDate(dateWithTime, format?) {
        if (dateWithTime) {
            // console.log('date - ', dateWithTime);
            const date = new Date(dateWithTime);
            if (format == null) {
                format = 'yyyy-MM-dd';
            }
            return this.datePipe.transform(date, format);
        }
    }
}

import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    DatePipe
} from '@angular/common';

@Pipe({
    name: 'experienceDate',
    pure: false
})
export class SharedExperienceDatePipeComponent implements PipeTransform {
    public transform (date: string): string {
        let datePipe = new DatePipe('en-US');
        date = datePipe.transform(date, 'MMM yyyy');

        return date;
    }
}


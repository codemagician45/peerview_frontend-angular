import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';

@Pipe({
  name: 'availablePost',
  pure: false
})
export class SharedAvailablePostPipeComponent implements PipeTransform {
  public transform (items: any[]): any[] {
    let returnData: any[] = [];

    if (items && items.length) {
      items.map((item, index) => {
        if (item.user) {
          returnData.push(item);
        }
      });
    }

    return returnData;
  }
}


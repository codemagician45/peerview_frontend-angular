import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';

@Pipe({
  name: 'availableNotification',
  pure: false
})
export class SharedAvailableNotificationPipeComponent implements PipeTransform {
  public transform (items: any[]): any[] {
    let returnData: any[] = [];

    items.map((item, index) => {
      if (item.subject) {
        returnData.push(item);
      }
    });

    return returnData;
  }
}


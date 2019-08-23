import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';

@Pipe({
  name: 'availableFollowee',
  pure: false
})
export class SharedAvailableFolloweePipeComponent implements PipeTransform {
  public transform (items: any[]): any[] {
    let returnData: any[] = [];

    if (items && items.length) {
      items.map((item, index) => {
        if (item.follows && item.follows.followee) {
          returnData.push(item);
        }
      });
    }

    return returnData;
  }
}


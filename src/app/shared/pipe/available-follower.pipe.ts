import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';

@Pipe({
  name: 'availableFollower',
  pure: false
})
export class SharedAvailableFollowerPipeComponent implements PipeTransform {
  public transform (items: any[]): any[] {
    let returnData: any[] = [];

    if (items && items.length) {
      items.map((item, index) => {
        if (item.follows && item.follows.follower) {
          returnData.push(item);
        }
      });
    }

    return returnData;
  }
}


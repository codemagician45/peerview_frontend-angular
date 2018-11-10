import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  NotificationModel,
  IResponse
} from '../../app/shared/models';
import {
  NotificationFactory
} from '../../app/shared/models/factory';

@Injectable()
export class NotificationApiService extends ApiService {
  public options = {};
  public baseURI = 'notification';
  public baseURIPlural = 'notifications';

  public promiseGetAllNotifications (): Promise<NotificationModel[]> {
    return this.promiseGetResponseData('list')
      .then((response: IResponse) => {
        return NotificationFactory.createMany(response.data.rows);
      });
  }
}

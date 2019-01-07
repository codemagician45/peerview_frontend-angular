import {
  Component
} from '@angular/core';
import {
  NotificationApiService
} from '../../../../services/api';
import {
  NotificationModel
} from '../../models';

@Component({
  selector: 'notification-list-component',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class SharedNotificationListComponent {
  constructor (
    private notificationApiService: NotificationApiService
  ) {}

  protected notifications: NotificationModel[];

  public ngOnInit (): void {
    this.notificationApiService.promiseGetAllNotifications()
      .then(response => {
          this.notifications = response;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

import {
  Component
} from '@angular/core';
import {
  UserApiService
} from '../../../services/api/user.api.service';
import {
  UserService
} from '../../../services/user.service';
import {
  UserModel,
  IResponse
} from '../../shared/models';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../services';

@Component({
  selector: 'profile-right-sidebar-component',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class ProfileRightSidebarComponent {
  constructor (private userApiService: UserApiService) {}

  protected user: UserModel = UserService.getOtherUser();
  protected followed: boolean = false;

  protected onClickFollowButton (): void {
    this.userApiService.promisePostFollowUser(this.user.id)
      .then((response: IResponse) => {
        console.log('follow user', response);
        this.followed = true;
      })
      .catch(error => {
        console.log('follow user', error);
        this.followErrorNotification();
      });
  }

  private followErrorNotification (): MessageNotificationService {
    return MessageNotificationService.show({
      notification: {
        id: 'right-sidebar-follow-message',
        message: 'Follow Error',
        instruction: 'Something went wrong! Please try again.'
      }
    },
    NotificationTypes.Error);
  }
}

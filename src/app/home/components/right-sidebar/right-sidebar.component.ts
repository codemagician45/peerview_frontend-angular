import {
  Component
} from '@angular/core';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel,
  IResponse
} from '../../../../app/shared/models';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';

@Component({
  selector: 'home-right-sidebar-component',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class HomeRightSidebarComponent {


  constructor (private userApiService: UserApiService) {
  }

  protected user: UserModel = new UserModel();

  private inviteNotificationError (instruction): void {
    MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Sending Invite',
          instruction: instruction
        }
      },
      NotificationTypes.Error);
  }

  protected onInviteUser (): any {
    if (!this.user.email) {
      this.inviteNotificationError('Please enter an email.');
    }

    return this.inviteUser();
  }

  private inviteNotificationSuccess (): void {
    MessageNotificationService.show({
        notification: {
          id: 'user-invited',
          message: 'Invitation Sent!',
          instruction: 'You have invited ' + this.user.email + ' to Peersview.'
        }
      },
      NotificationTypes.Info);
  }

  protected inviteUser (): void {
    this.userApiService.promisePostInviteUser(this.user)
      .then((response: IResponse) => {
        console.log(response);
        this.inviteNotificationSuccess();
      })
      .catch(error => {
        this.inviteNotificationError(error.error.status_message);
      });
  }


}

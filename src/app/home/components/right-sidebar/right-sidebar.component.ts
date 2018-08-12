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
@Component({
  selector: 'home-right-sidebar-component',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class HomeRightSidebarComponent {
  constructor (private userApiService: UserApiService) {}

  protected user: UserModel = new UserModel();

  protected inviteUser (): void {
    this.userApiService.promisePostInviteUser(this.user)
      .then((response: IResponse) => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

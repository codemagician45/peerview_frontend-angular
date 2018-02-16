import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../../shared/models';
import {
  UserClass
} from '../../../shared/classes';

@Component({
  selector: 'profile-left-sidebar-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class ProfileLeftSidebarUserInfoComponent {
  constructor () {
    console.log(this.user);
  }

  protected user: UserModel = UserClass.getUser();
}

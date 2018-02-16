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
  selector: 'profile-left-sidebar-user-other-info-component',
  templateUrl: './user-other-info.component.html',
  styleUrls: ['./user-other-info.component.scss']
})
export class ProfileLeftSidebarUserOtherInfoComponent {
  constructor () {}

  protected user: UserModel = UserClass.getUser();
}

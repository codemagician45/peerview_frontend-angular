import {
  Component
} from '@angular/core';
import {
  UserClass
} from '../../../classes';
import {
  UserModel
} from '../../../models';

@Component({
  selector: 'navbar-desktop-component',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class NavbarDesktopComponent {
  constructor () {}

  private user: UserModel = UserClass.getUser();
}

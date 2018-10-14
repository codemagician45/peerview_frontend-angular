import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../../models';
import {
  TokenStore,
  UserService
} from '../../../../../services';

@Component({
  selector: 'navbar-desktop-component',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class NavbarDesktopComponent {
  constructor () {}

  protected user: UserModel = UserService.getUser();
  protected keyword: string = null;

  protected onSignOut (): void {
    TokenStore.expungeData();
    window.location.reload();
  }
}

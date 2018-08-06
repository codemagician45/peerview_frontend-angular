import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
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
  constructor (
    private router: Router
  ) {}

  private user: UserModel = UserService.getUser();

  protected onSignOut (): void {
    TokenStore.expungeData();
    this.router.navigate(['']);
    window.location.reload();
  }
}

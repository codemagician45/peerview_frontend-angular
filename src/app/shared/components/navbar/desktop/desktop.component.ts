import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserClass
} from '../../../classes';
import {
  UserModel
} from '../../../models';
import {
  UserService
} from '../../../../../services';

@Component({
  selector: 'navbar-desktop-component',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class NavbarDesktopComponent {
  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  private user: UserModel = UserClass.getUser();

  protected onSignOut (): void {
    this.userService.signOut();
    this.router.navigate(['']);
  }
}

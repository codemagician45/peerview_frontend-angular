import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService,
  TokenStore,
} from '../../../../../services';
import {
  UserModel
} from '../../../models';

@Component({
  selector: 'navbar-mobile-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  constructor () {}

  protected user: UserModel = UserService.getUser();

  public ngOnInit (): void {}

  protected onSignOut (): void {
    TokenStore.expungeData();
    window.location.reload();
  }
}

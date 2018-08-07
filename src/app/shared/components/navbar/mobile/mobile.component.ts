import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
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
  constructor (
    private router: Router
  ) {}

  private user: UserModel = UserService.getUser();

  public ngOnInit (): void {}

  protected onSignOut (): void {
    TokenStore.expungeData();
    this.router.navigate(['']);
    window.location.reload();
  }
}

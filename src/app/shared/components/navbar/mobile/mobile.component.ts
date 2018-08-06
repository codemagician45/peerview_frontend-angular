import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
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

  private user: UserModel = UserService.getUser();

  public ngOnInit (): void {}
}

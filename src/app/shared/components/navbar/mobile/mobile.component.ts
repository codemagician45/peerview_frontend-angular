import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserClass
} from '../../../classes';
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

  private user: UserModel = UserClass.getUser();

  public ngOnInit (): void {}
}

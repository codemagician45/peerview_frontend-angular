import {
  Component
} from '@angular/core';
import {
  UserClass
} from '../../shared/classes';
import {
  UserModel
} from '../../shared/models';

@Component({
  selector: 'account-settings-blocking-component',
  templateUrl: './blocking.component.html',
  styleUrls: ['./blocking.component.scss']
})
export class AccountSettingsBlockingComponent {
  constructor () {}

  private user: UserModel = UserClass.getUser();

  public ngOnInit (): void {}
}

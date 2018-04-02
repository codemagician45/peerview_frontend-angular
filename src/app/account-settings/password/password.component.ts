import {
  Component
} from '@angular/core';
import {
  UserClass
} from '../../shared/classes';
import {
  UserModel,
  Response
} from '../../shared/models';
import {
  UserService
} from '../../../services';

@Component({
  selector: 'account-settings-password-component',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class AccountSettingsPasswordComponent {
  constructor (
    private userService: UserService
  ) {}

  protected user: UserModel = new UserModel();

  public ngOnInit (): void {}

  protected onPasswordUpdate (isValid): void {
    if (isValid) {
      console.log(this.user);
      this.userService.updatepassword(this.user)
      .subscribe((response: Response) => {
        console.log(response);
      });
    }
  }
}

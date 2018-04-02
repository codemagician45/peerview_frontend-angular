import {
  Component
} from '@angular/core';
import {
  UserClass
} from '../../shared/classes';
import {
  UserModel
} from '../../shared/models';
import {
  UserService
} from '../../../services';

@Component({
  selector: 'account-settings-security-privacy-component',
  templateUrl: './security-privacy.component.html',
  styleUrls: ['./security-privacy.component.scss']
})
export class AccountSettingsSecurityPrivacyComponent {
  constructor (
    private userService: UserService
  ) {}

  private user: UserModel = UserClass.getUser();

  public ngOnInit (): void {}

  protected onUpdateSecurity (): void {
    this.userService.updateSecurity(this.user)
    .subscribe((response: Response) => {
      console.log(response);
    });
  }
}

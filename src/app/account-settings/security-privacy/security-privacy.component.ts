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
  UserApiService
} from '../../../services/api';

@Component({
  selector: 'account-settings-security-privacy-component',
  templateUrl: './security-privacy.component.html',
  styleUrls: ['./security-privacy.component.scss']
})
export class AccountSettingsSecurityPrivacyComponent {
  constructor (
    private userApiService: UserApiService
  ) {}

  private user: UserModel = UserClass.getUser();

  public ngOnInit (): void {}

  protected onUpdateSecurity (): void {
    this.userApiService.promiseUpdateSecurity(this.user)
      .then(() => {})
      .catch(() => {});
  }
}

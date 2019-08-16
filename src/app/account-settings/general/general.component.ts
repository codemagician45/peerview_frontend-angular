import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';
import {
  UserApiService
} from '../../../services/api';
import {
  UtilitiesService, MessageNotificationService, NotificationTypes,
} from '../../../services';

@Component({
  selector: 'account-settings-general-component',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class AccountSettingsGeneralComponent {
  constructor (
    private utilitiesService: UtilitiesService,
    private userApiService: UserApiService
  ) {}

  private name: {status: string, key: string, firstName?: string, lastName?: string} = {status: 'Edit', key: 'name'};
  private email: {status: string, key: string, value?: string} = {status: 'Edit', key: 'email'};
  private languages: {status: string, key: string, value?: string} = {status: 'Edit', key: 'language'};
  private dateOfBirth: {status: string, key: string, value?: Date} = {status: 'Edit', key: 'birthDate'};
  private birthString: string = 'mm/dd/yyyy';
  private languagesData = this.utilitiesService.getlanguages();
  private userInfo: any;
  private isSentVerifyCode : boolean = false;
  private verifyPendingEmailAddress: string;

  public ngOnInit (): void {
    this.userApiService.promiseGetUser().then((userInfo: UserModel) => {
      console.log(userInfo);
      this.name.firstName = userInfo.firstName;
      this.name.lastName = userInfo.lastName;
      this.email.value = userInfo.email;
      this.dateOfBirth.value = userInfo.birthDate;
      this.birthString = this.utilitiesService.getBirthDate(userInfo.birthDate);
      this.languages.value = userInfo.language ? userInfo.language : 'English (UK)';
      this.userInfo = userInfo;
    })
  }

  protected onEditOrSave (item): void {
    if (item.status === 'Edit') {
      item.status = 'Save';
    } else {
      // request here to save the data
      console.log(item.key);
      switch (item.key) {
        case 'name':
          // this.updateUserName(item);
          break;
        case 'email':
          // this.updateUserEmail(item);
          break;
        case 'language':
          // this.updateUserLanguage(item);
          break;
      }

      item.status = 'Edit';
    }
  }

  protected onChangeLanguage (value): void {
    this.languages.value = value;
  }

  private sendEmailVerifyCode(email): void {
    this.verifyPendingEmailAddress = email;
    if(this.userInfo.email != email) {
      var data = {
        email: email
      };

      this.userApiService.sendVerifyEmailCode(data).then((res: any) => {
        this.isSentVerifyCode = true;
      }).catch(error => {
        MessageNotificationService.show({
          notification: {
            id: 'send-email-verify-code-error',
            message: 'Can\'t send code to your email',
            reason: error.error,
            instruction: 'Please try again with another email address.'
          }
        },
        NotificationTypes.Error);
      })
    }
  }

  private verifyEmailAddress(code): void {
    let data = {
      email: this.verifyPendingEmailAddress, 
      code: code
    }

    this.userApiService.verifyChangedPrimaryEmail(data).then((res: any) => {
      this.email.status = "Edit";
      this.isSentVerifyCode = false;
      this.userInfo.email = this.verifyPendingEmailAddress;
    })
  }

  private checkUpdatable() {
    if(
      this.userInfo &&
      this.userInfo.firstName == this.name.firstName && 
      this.userInfo.lastName == this.name.lastName && 
      this.userInfo.language == this.languages.value && 
      this.userInfo.birthDate == this.dateOfBirth.value) {
        return false;
    } else {
      return true;
    }
  }

  private saveGeneralInfo(): void {
    if(this.checkUpdatable()) {
      let data = {
        firstName: this.name.firstName,
        lastName: this.name.lastName,
        language: this.languages.value,
        birthDate: this.dateOfBirth.value
      };

      this.userApiService.promiseUpdateGeneralSetting(data).then((response: any) => {
        this.userInfo.firstName = this.name.firstName;
        this.userInfo.lastName = this.name.lastName;
        this.userInfo.language = this.languages.value;
        this.userInfo.birthDate = this.dateOfBirth.value;
        this.name.status = "Edit";
        this.languages.status = "Edit";
        this.dateOfBirth.status = "Edit";
        this.birthString = this.utilitiesService.getBirthDate(this.dateOfBirth.value);
      })
    }
  }

  // private updateUserName (name): void {
  //   let nameTemp = Object.assign({}, name);
  //
  //   this.userService.updateName(name)
  //   .subscribe((response: Response) => {
  //     this.user.firstName = nameTemp.firstName;
  //     this.user.lastName = nameTemp.lastName;
  //   });
  // }
  //
  // private updateUserEmail (email): void {
  //   let emailTemp = Object.assign({}, email);
  //
  //   this.userService.updateEmail(email.value)
  //   .subscribe((response: Response) => {
  //     this.user.email = emailTemp.value;
  //   });
  // }
  //
  //
  // private updateUserLanguage (language): void {
  //   let languageTemp = Object.assign({}, language);
  //
  //   this.userService.updateLanguage(language.value)
  //   .subscribe((response: Response) => {
  //     this.user.language = languageTemp.value;
  //   });
  // }
}

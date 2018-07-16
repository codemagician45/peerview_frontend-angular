import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel,
  UserResponse,
  SignInViaSocialModel,
  ISocialResponse,
  ISignInViaSocialResponse,
} from '../shared/models';
import {
  UserService,
  MessageNotificationService,
  NotificationTypes
} from '../../services';
import {
  UserClass
} from '../shared/classes';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'sign-in-component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor (
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  private signInViaSocial: SignInViaSocialModel = new SignInViaSocialModel();

  protected onSignIn (isValid: boolean): void {
    if (!isValid) {
      return;
    }

    MessageNotificationService.show({
      notification: {
        id: 'sign-in-please-wait',
        message: 'Logging you in',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);

    this.userService.signIn(this.user)
    .mergeMap((response: UserResponse) => {
      UserClass.setUser(response.user);
      return this.userService.setLoggedInUser(response.user);
    })
    .subscribe(() => {
      this.router.navigate(['/home']);
    }, (error) => {
      if (error.status === 400) {
        MessageNotificationService.show({
          notification: {
            id: 'sign-in-error',
            message: 'Unable to Login.',
            reason: error.error.status_message,
            instruction: 'Please correct the errors and try again.'
          }
        },
        NotificationTypes.Error);
      } else {
        MessageNotificationService.show({
          notification: {
            id: 'ssign-in-error',
            message: 'Unable to Login.',
            reason: 'Some unexpected happened with the application.',
            instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
          }
        },
        NotificationTypes.Error);
      }
    });
  }

  protected onSignInViaSocial (provider: string): void {
    this.enableSocialProviderSubscriber();
    let socialProvider = this.getSocialProviderId(provider);
    this.authService.signIn(socialProvider);
  }

  private enableSocialProviderSubscriber (): void {
    this.authService.authState
    .mergeMap((response: SocialUser) => {
      const name = response.name.split(' ');
      this.signInViaSocial.email = response.email;
      this.signInViaSocial.firstName = name[0];
      this.signInViaSocial.lastName = name[1];
      this.signInViaSocial.image = response.photoUrl;
      this.signInViaSocial.provider = response.provider.toLowerCase();
      this.signInViaSocial.uid = response.id;

      // check if the email is undefined
      // meaning the email is not yet verified
      if (!response.email) {
        let error = {
          reason: 'Please validate email',
          error: 401
        };

        throw new Error(JSON.stringify(error));
      }

      return this.userService.signInViaSocial(this.signInViaSocial);
    })
    .mergeMap((response: ISignInViaSocialResponse) => {
      return this.userService.setLoggedInUser(response.user);
    })
    .subscribe(() => {
      this.router.navigate(['/home']);
    }, (error) => {
      console.log(error);
    });
  }

  private getSocialProviderId (provider): string {
    if (provider === 'facebook') {
      return FacebookLoginProvider.PROVIDER_ID;
    }

    return null;
  }
}

import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel,
  SignUpViaSocialModel,
  ISocialResponse,
  ISignUpViaSocialResponse,
  Response
} from '../shared/models';
import {
  UserService,
  MessageNotificationService,
  NotificationTypes
} from  '../../services';
import 'rxjs/add/operator/mergeMap';

import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';

@Component({
  selector: 'sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor (
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  protected hasAgreed: boolean = false;
  protected user: UserModel = new UserModel();
  private signUpViaSocial: SignUpViaSocialModel = new SignUpViaSocialModel();

  protected onSignUp (): void {
    const splitNames = this.user.name.split(' ');
    this.user.firstName = splitNames[0];
    this.user.lastName = splitNames[1];

    if (this.hasAgreed) {
      MessageNotificationService.show({
        notification: {
          id: 'sign-up-please-wait',
          message: 'Sign-up',
          instruction: 'Please wait...'
        }
      },
      NotificationTypes.Info);

      this.userService.signUp(this.user)
      .mergeMap((response: Response) => {
        return MessageNotificationService.show({
          notification: {
            id: 'sign-up-success',
            message: 'Sign-up.. Success!!!',
            instruction: 'Redirecting...'
          }
        },
        NotificationTypes.Success);
      })
      .toPromise()
      .then(notificationState => {
        if (notificationState) {
          notificationState.subscribe((data: any) => {
            this.router.navigate(['thank-you-for-signing'],  {relativeTo: this.route});
          });
        }
      })
      .catch(error => {
        if (error.status === 400) {
          MessageNotificationService.show({
            notification: {
              id: 'sign-up-error',
              message: 'Unable to Sign-up.',
              reason: error.error.status_message,
              instruction: 'Please correct the errors and try again.'
            }
          },
          NotificationTypes.Error);
        } else {
          MessageNotificationService.show({
            notification: {
              id: 'sign-up-error',
              message: 'Unable to Sign-up.',
              reason: 'Some unexpected happened with the application.',
              instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
            }
          },
          NotificationTypes.Error);
        }
      });
      // .subscribe((response: Response) => {
      //   this.router.navigate(['thank-you-for-signing'],  {relativeTo: this.route});
      // }, (error) => {
      //   if (error.status === 400) {
      //     MessageNotificationService.show({
      //       notification: {
      //         id: 'sign-up-error',
      //         message: 'Unable to Sign-up.',
      //         reason: error.error.status_message,
      //         instruction: 'Please correct the errors and try again.'
      //       }
      //     },
      //     NotificationTypes.Error);
      //   } else {
      //     MessageNotificationService.show({
      //       notification: {
      //         id: 'sign-up-error',
      //         message: 'Unable to Sign-up.',
      //         reason: 'Some unexpected happened with the application.',
      //         instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
      //       }
      //     },
      //     NotificationTypes.Error);
      //   }
      // });
    }
  }

  protected onSignUpViaSocial (provider: string): void {
    this.enableSocialProviderSubscriber();
    let socialProvider = this.getSocialProviderId(provider);
    this.authService.signIn(socialProvider);
  }

  private enableSocialProviderSubscriber (): void {
    this.authService.authState
    .flatMap((response: SocialUser) => {
      const name = response.name.split(' ');
      this.signUpViaSocial.email = response.email;
      this.signUpViaSocial.firstName = name[0];
      this.signUpViaSocial.lastName = name[1];
      this.signUpViaSocial.image = response.photoUrl;
      this.signUpViaSocial.provider = response.provider.toLowerCase();
      this.signUpViaSocial.uid = response.id;

      // check if the email is undefined
      // meaning the email is not yet verified
      if (!response.email) {
        let error = {
          reason: 'Please validate email',
          error: 401
        };

        throw new Error(JSON.stringify(error));
      }

      return this.userService.signInViaSocial(this.signUpViaSocial);
    })
    .flatMap((response: ISignUpViaSocialResponse) => {
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

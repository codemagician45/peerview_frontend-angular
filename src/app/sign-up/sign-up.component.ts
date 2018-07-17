import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel,
  UserResponse,
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
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
import {
  UserClass
} from '../shared/classes';
import 'rxjs/add/operator/mergeMap';

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

  private signUpViaSocial: SignUpViaSocialModel = new SignUpViaSocialModel();
  private isSignUpViaSocialIsClick: boolean = false;
  protected hasAgreed: boolean = false;
  protected user: UserModel = new UserModel();

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
    }
  }

  protected onSignUpViaSocial (provider: string): void {
    let socialProvider = this.getSocialProviderId(provider);
    this.authService.signIn(socialProvider)
      .then((response: SocialUser) => {
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

        return this.userService.signInViaSocial(this.signUpViaSocial).toPromise();
      })
      .then((response: UserResponse) => {
        UserClass.setUser(response.user);
        this.userService.setLoggedInUser(response.user);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private getSocialProviderId (provider): string {
    if (provider === 'facebook') {
      return FacebookLoginProvider.PROVIDER_ID;
    } else if (provider === 'google') {
      return GoogleLoginProvider.PROVIDER_ID;
    } else if (provider === 'linkedin') {
      return LinkedInLoginProvider.PROVIDER_ID;
    }

    return null;
  }
}

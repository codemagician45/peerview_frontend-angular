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
  UserService
} from  '../../services';

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
      this.userService.signUp(this.user)
      .subscribe((response: Response) => {
        this.router.navigate(['thank-you-for-signing'],  {relativeTo: this.route});
      }, (error) => {
        console.log(error);
      });
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

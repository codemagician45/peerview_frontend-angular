import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from 'angular2-social-login';
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


@Component({
  selector: 'sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor (
    private userService: UserService,
    private authService: AuthService,
    private router: Router
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
        // console.log(response);
        /* Local sign up will be redirected to
            Verify email page
        */
      }, (error) => {
        // console.log(error);
      });
    }
  }

  protected onSignUpViaSocial (provider: string): void {
    this.authService.login(provider)
    .flatMap((response: ISocialResponse) => {
      const name = response.name.split(' ');
      this.signUpViaSocial.email = response.email;
      this.signUpViaSocial.firstName = name[0];
      this.signUpViaSocial.lastName = name[1];
      this.signUpViaSocial.image = response.image;
      this.signUpViaSocial.provider = response.provider;
      this.signUpViaSocial.uid = response.uid;
      return this.userService.signUpViaSocial(this.signUpViaSocial);
    })
    .flatMap((response: ISignUpViaSocialResponse) => {
      return this.userService.setLoggedInUser(response.user);
    })
    .subscribe(() => {
      // console.log('redirect to on boarding.');
      /* Social sign up will be redirected to
          on boarding component
      */
      // this.router.navigate(['/home']);
    }, (error) => {
      // console.log(error);
    });
  }
}

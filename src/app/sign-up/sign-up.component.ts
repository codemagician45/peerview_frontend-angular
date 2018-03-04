import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel,
  SignInViaSocialModel,
  ISocialResponse,
  ISignInViaSocialResponse,
  Response
} from '../shared/models';
import {
  UserService
} from  '../../services';
import {
  AuthService
} from 'angular2-social-login';


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
  private signInViaSocial: SignInViaSocialModel = new SignInViaSocialModel();

  protected onSignUp (): void {
    const splitNames = this.user.name.split(' ');
    this.user.firstName = splitNames[0];
    this.user.lastName = splitNames[1];

    this.userService.signUp(this.user)
    .subscribe((response: Response) => {
      console.log(response);
    }, (error) => {
    });
  }

  protected onSignUpViaSocial (provider: string): void {
    this.authService.login(provider)
    .flatMap((response: ISocialResponse) => {
      const name = response.name.split(' ');
      this.signInViaSocial.email = response.email;
      this.signInViaSocial.firstName = name[0];
      this.signInViaSocial.lastName = name[1];
      this.signInViaSocial.image = response.image;
      this.signInViaSocial.provider = response.provider;
      this.signInViaSocial.uid = response.uid;
      return this.userService.signInViaSocial(this.signInViaSocial);
    })
    .flatMap((response: ISignInViaSocialResponse) => {
      return this.userService.setLoggedInUser(response.user);
    })
    .subscribe(() => {
      this.router.navigate(['/home']);
    }, (error) => {

    });
  }

  private registerCustomer (user): void {
    this.userService.signUp(user).subscribe((resp) => {
      console.log(resp);
      if (resp['status'] === 'SUCCESS') {
        // this.submitted = true;
        // this.router.navigate(['/onBoard']);
      }
    }, (error) => {
      console.log(error);
      // this.responceError = error['error'].status_message;
    });
  }
}

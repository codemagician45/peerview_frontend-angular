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
  UserService
} from '../../services';
import {
  AuthService
} from 'angular2-social-login';

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
    isValid && this.userService.signIn(this.user)
    .flatMap((response: UserResponse) => {
      return this.userService.setLoggedInUser(response.user);
    })
    .subscribe(() => {
      this.router.navigate(['/home']);
    }, (error) => {

    });
  }

  protected onSignInViaSocial (provider: string): void {
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
}

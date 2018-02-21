import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../shared/models';

@Component({
  selector: 'sign-in-component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor () {}

  protected user: UserModel = new UserModel();

  protected onSignIn (): void {
    // let isValid = true;
    // if (this.model.password.length < 8) {
    //   isValid = false;
    //   alert('Password required at least 8 characters');
    // }
    //
    // if (isValid && this.model.email.indexOf('@') === -1) {
    //   isValid = false;
    //   alert('Invalid Email Specified');
    // }
    //
    // if (isValid && this.model.email && this.model.password) {
    //   this.authenticationService.authenticateCustomer(this.model)
    //   .subscribe((response: any) => {
    //     this.submitted = true;
    //     const user = response.user;
    //     this.userService.setLoggedInUser(user);
    //     this.router.navigate(['/home']);
    //   }, (error) => {
    //     this.responceError = error['error'].status_message;
    //   });
    // }
  }
}

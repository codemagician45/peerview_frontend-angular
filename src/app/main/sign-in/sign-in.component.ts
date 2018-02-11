import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  SignIn,
  ForgotPassword
} from '../../../models/models';
import {
  AuthenticationService,
  UserService
} from '../../../services/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  private responceError: any;
  private submitted = false;
  protected model = new SignIn('', '');
  protected isFormVisible = false;

  public ngOnInit (): void { }

  protected onSubmit (): void {
    let isValid = true;
    if (this.model.password.length < 8) {
      isValid = false;
      alert('Password required at least 8 characters');
    }

    if (isValid && this.model.email.indexOf('@') === -1) {
      isValid = false;
      alert('Invalid Email Specified');
    }

    if (isValid && this.model.email && this.model.password) {
      this.authenticationService.authenticateCustomer(this.model)
      .subscribe((response: any) => {
        this.submitted = true;
        const user = response.user;
        this.userService.setLoggedInUser(user);
        this.router.navigate(['/home']);
      }, (error) => {
        this.responceError = error['error'].status_message;
      });
    }
  }

  protected showForm ($event): void {
    this.isFormVisible = true;
  }
}

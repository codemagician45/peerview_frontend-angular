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
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor (
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    private router: Router
  ) {}

  protected forgotPassModel = new ForgotPassword('');

  public ngOnInit (): void { }

  protected forgotPasswordSubmit (): void {
    this._authenticationService.restorePassword(this.forgotPassModel)
    .subscribe((response: any) => {
      alert('Password reset link has been sent to your email.');
    }, (error) => {
      alert(error['error'].status_message);
    });
  }
}

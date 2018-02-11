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
  AuthenticationService
} from '../../../services/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  protected forgotPassModel = new ForgotPassword('');

  public ngOnInit (): void { }

  protected forgotPasswordSubmit (): void {
    this.authenticationService.restorePassword(this.forgotPassModel)
    .subscribe((response: any) => {
      alert('Password reset link has been sent to your email.');
    }, (error) => {
      alert(error['error'].status_message);
    });
  }
}

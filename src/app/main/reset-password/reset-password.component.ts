import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  SignUp,
  SignIn,
  ResetPassword
} from '../../../models/models';
import {
  AuthenticationService
} from '../../../services/services';

declare var swal: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute
  ) {
    this.authenticationService.authenticatetoken()
    .subscribe((response: any) => {
      this.sucessMessage = 'true';
    }, (error) => {
      this.errorMessage = ' ' + error['error'].status_message;
      setTimeout(() => {
        this.router.navigate(['/forgot-password']);
      }, 5000);
    });
  }

  private sub: any;
  private token: string;
  private sucessMessage: string;
  private responceSucess: string;
  protected responceError: string;
  protected errorMessage: string;
  protected model = new ResetPassword('', '');
  protected submitted = false;
  protected isFormVisible = false;

  public ngOnInit (): void { }

  protected resetPassword (): void {
    this.sub = this.route.params.subscribe((params: any) => {
      this.token = params.token;
      this.authenticationService.resetPassword(this.model, this.token)
      .subscribe(res => {
        if (res['status'] === 'SUCCESS') {
          this.responceSucess = 'Password Reset Successfully!!';
          setTimeout((router: Router) => {
            this.router.navigate(['/sign-in']);
          }, 3000);
        }
      }, (error) => {
        this.responceError = ' ' + error['error'].status_message;
      });
    });
  }
}

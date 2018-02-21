import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  SignUp,
  SignIn
} from '../../../models/models';
import {
  AuthenticationService
} from '../../../services/services';

declare var swal: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loading = true;
  }

  private submitted = false;
  protected isFormVisible = false;
  protected model = new SignUp('', '', '', '', true);
  protected captchaChecked = false;
  private responceError = false;
  private loading = false;

  public ngOnInit (): void { }

  /* Sign-up Register User Function */
  public onSubmit (): void {
    const splitnames = this.model.name.split(' ');
    this.model.firstName = splitnames[0];
    this.model.lastName = splitnames[1];
    // this.authenticationService.registerCustomer(this.model).subscribe((resp) => {
    //   if (resp['status'] === 'SUCCESS') {
    //     this.submitted = true;
    //     this.router.navigate(['/onBoard']);
    //   }
    // }, (error) => {
    //   this.responceError = error['error'].status_message;
    // });
  }

  get diagnostic (): string {
    return JSON.stringify(this.model);
  }

  protected captchaResponse (token, test): void {
    if (token) {
      this.captchaChecked = true;
    }
  }

  protected captchaExpired ($event): void {
    this.captchaChecked = false;
  }

  protected showForm ($event): void {
    this.isFormVisible = true;
  }
}

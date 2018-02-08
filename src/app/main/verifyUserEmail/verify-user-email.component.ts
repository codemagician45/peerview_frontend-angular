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
  SignIn
} from '../../../models/models';
import {
  AuthenticationService,
  UserService
} from '../../../services/services';

declare var swal: any;
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-user-email.component.html',
  styleUrls: ['./verify-user-email.component.scss']
})

export class VerifyUserEmailComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router, private route: ActivatedRoute
  ) {
    /* User authentication verify email function */
    this.sub = this.route.params.subscribe((params: any) => {
      this.jotToken = params.jotToken;
      this.authenticationService.authenticateUseremail(this.jotToken).subscribe((response: any) => {
        setTimeout(() => {
          const user = response.user;
          this.userService.setLoggedInUser(user);
          this.router.navigate(['/onboard/1'], { queryParams: { type: true } });
        }, 1000);
      }, (error) => {
        if (error['error'].body) {
          this.errorMessage = ' ' + error['error'].body.status_message;
        } else if (error['error'].status === 'ERROR') {
          this.errorMessage = ' ' + error['error'].status_message;
        }
      });
    });
  }

  private sub: any;
  private jotToken: string;
  private successMessage: string;
  private errorMessage: string;

  public ngOnInit (): void {}
}

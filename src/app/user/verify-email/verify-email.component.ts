import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserService
} from '../../../services/user.service';

@Component({
  selector: 'user-verify-email-component',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class UserVerifyEmailComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  public ngOnInit (): void {
    this.route.queryParams.subscribe((queryParams: {jotToken: string, token: string}) => {
      this.userService.verifyEmail(queryParams.jotToken, queryParams.token)
      .subscribe((response: any) => {
        const user = response.user;
        this.userService.setLoggedInUser(user);
        this.router.navigate(['/onboard/1'], {
          queryParams: {
            type: true
          }
        });
      });
    });
  }
}

import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthenticationService,
  UserService
} from '../../../services/services';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  constructor (
    private _authservice: AuthenticationService,
    private _userService: UserService,
    private router: Router
  ) {}

  protected followers = [];

  public ngOnInit (): void {
    const user = this._userService.getLoggedInUser();
    this._authservice.getfollowers(user ? user.id : 0).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  protected showAll (): void {
    this.router.navigate(['/my/followers-following', { type: 'followers' }]);
  }
}

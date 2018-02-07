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
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  constructor (
    private _authservice: AuthenticationService,
    private _userService: UserService,
    private router: Router
  ) {}

  private following = [];

  public ngOnInit (): void {
    const user = this._userService.getLoggedInUser();

    this._authservice.getfollowingusers(user ? user.id : 0).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  protected showAll (): void {
    this.router.navigate(['/my/followers-following', { type: 'following' }]);
  }
}

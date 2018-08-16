/**
 * This component is for user's followee
 * which the current login user follows
 */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';

@Component({
  selector: 'shared-followee-component',
  templateUrl: './followee.component.html',
  styleUrls: ['./followee.component.scss']
})
export class SharedFolloweeComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private router: Router
  ) {}

  private followee: Array<UserModel> = [];

  public ngOnInit (): void {
    this.getUserFollowee();
  }

  private getUserFollowee (): void {
    this.userApiService.promiseGetFollowee()
      .then((followee: UserModel[]) => {
        this.followee = followee;
      })
      .catch(() => {});
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }
}

import {
  Component
} from '@angular/core';
import {
  UserService
} from '../../../../services';
import {
  UserModel,
  FollowersResponse
} from '../../../shared/models';

@Component({
  selector: 'shared-followers-component',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class SharedFollowersComponent {
  constructor (private userService: UserService) {}

  private followers: Array<UserModel> = [];

  public ngOnInit (): void {
    this.getUserFollowers();
  }

  private getUserFollowers (): void {
    this.userService.getFollowers()
    .subscribe((response: FollowersResponse) => {
      this.followers = response.followers;
    });
  }
}

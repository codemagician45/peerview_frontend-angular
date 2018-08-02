import {
  Component
} from '@angular/core';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'shared-followers-component',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class SharedFollowersComponent {
  constructor (private userApiService: UserApiService) {}

  private followers: Array<UserModel> = [];

  public ngOnInit (): void {
    this.getUserFollowers();
  }

  private getUserFollowers (): void {
    this.userApiService.promiseGetFollowers()
      .then((followers: UserModel[]) => {
        this.followers = followers;
      })
      .catch(() => {});
  }
}

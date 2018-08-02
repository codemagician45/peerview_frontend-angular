/**
 * This component is for user's followee
 * which the current login user follows
 */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'shared-followee-component',
  templateUrl: './followee.component.html',
  styleUrls: ['./followee.component.scss']
})
export class SharedFolloweeComponent implements OnInit {
  constructor (private userApiService: UserApiService) {}

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
}

/**
 * This component is for user's followee
 * which the current login user follows
 */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../../../../services';
import {
  UserModel,
  FolloweeResponse
} from '../../../shared/models';

@Component({
  selector: 'shared-followee-component',
  templateUrl: './followee.component.html',
  styleUrls: ['./followee.component.scss']
})
export class SharedFolloweeComponent implements OnInit {
  constructor (private userService: UserService) {}

  private followee: Array<UserModel> = [];

  public ngOnInit (): void {
    this.getUserFollowee();
  }

  private getUserFollowee (): void {
    this.userService.getFollowee()
    .subscribe((response: FolloweeResponse) => {
      this.followee = response.followee;
    });
  }
}

/*angular*/
import {
  Component,
  OnInit,
  Input,
  Inject
} from '@angular/core';
/*third party*/
import {
  MAT_DIALOG_DATA
} from '@angular/material';
/*components*/
import {
  UnfollowUser
} from '../../../models/models';
import {
  AccountSettingService
} from '../../../services/services';

@Component({
  selector: 'app-unfollow-popup',
  templateUrl: './unfollow-popup.component.html',
  styleUrls: ['./unfollow-popup.component.scss']
})
export class UnfollowPopupComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountservice: AccountSettingService
  ) {}

  public ngOnInit (): void {}

  public unfollowuser (userId: number): void {
    this.accountservice.unfollowuser(userId).subscribe((response: UnfollowUser) => {});
  }
}

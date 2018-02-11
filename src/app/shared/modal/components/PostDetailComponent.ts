import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  Post,
  UserResponse,
  UserModel
} from '../../../../models/models';
import {
  AccountSettingService
} from '../../../../services/accountsetting.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: '../templates/post-detail.html',
  styleUrls: ['./post-detail-component.scss']
})
export class PostDetailComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) private post: Post,
    private accountSettingService: AccountSettingService
  ) {}

  protected stars: Array<string> = [];
  protected user: UserModel;
  protected disableRepliesLink: boolean = true;

  public ngOnInit (): void {
    this.getUserProfile();
  }

  private getUserProfile (): void {
    this.accountSettingService.getUserProfile()
    .subscribe((response: UserResponse) => {
      this.user = response.user;
    });
  }
}

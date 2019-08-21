import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  UserApiService
} from '../../../../../services/api';
import {
  UserModel
} from '../../../models';
import { V4MAPPED } from 'dns';

@Component({
  selector: 'app-add-social-link-modal',
  templateUrl: './add-social-link-modal.component.html',
  styleUrls: ['./add-social-link-modal.component.scss']
})
export class AddSocialLinksDialogComponent implements OnInit {

  constructor (
    @Inject (MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}
  private form: any = {};

  private user: UserModel = new UserModel();
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
    this.form.facebook_profile = this.data.user.facebook_profile;
    this.form.twitter_profile = this.data.user.twitter_profile;
    this.form.instagram_profile = this.data.user.instagram_profile;
    this.form.snapchat_profile = this.data.user.snapchat_profile;
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.form.facebook_profile || this.form.twitter_profile || this.form.instagram_profile || this.form.snapchat_profile ) {
      this.userApiService.promiseUpdateSocialLinks(this.form)
        .then(() => {
          let socialLinksModalComponentRef = this.dialog.getDialogById('ProfileAddSocialLinkModalComponent');
          socialLinksModalComponentRef.close(this.form);
        })
        .catch(error => {

        });
    }
  }
}

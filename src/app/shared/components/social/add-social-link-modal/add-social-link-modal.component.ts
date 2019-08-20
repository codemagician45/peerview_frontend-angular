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

@Component({
  selector: 'app-add-social-link-modal',
  templateUrl: './add-social-link-modal.component.html',
  styleUrls: ['./add-social-link-modal.component.scss']
})
export class AddSocialLinksDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    private aboutMe: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  private user: UserModel = new UserModel();
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.aboutMe);
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.aboutMe) {
      this.user.assimilate({
        aboutMe: this.aboutMe
      });

      this.userApiService.promiseUpdateAboutMe(this.user)
        .then(() => {
          let aboutModelComponentRef = this.dialog.getDialogById('ProfileAddSocialLinkModalComponent');
          aboutModelComponentRef.close(this.aboutMe);
        })
        .catch(error => {

        });
    }
  }
}

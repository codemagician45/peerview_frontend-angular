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
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'app-add-awards-modal',
  templateUrl: './add-awards-modal.component.html',
  styleUrls: ['./add-awards-modal.component.scss']
})
export class ProfileAddAwardsDialogComponent implements OnInit {

  constructor (
    @Inject (MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  private form: any = {};
  private isEdit: boolean = false;

  private user: UserModel = new UserModel();
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
    if (this.data.award) {
      this.form = this.data.award;
      this.isEdit = true;
    }
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.form.position && this.form.organization && this.form.from) {
      if (this.isEdit) {
        this.userApiService.promiseUpdateAwards(this.form)
        .then((res) => {
          let addAwardsModelComponentRef = this.dialog.getDialogById('ProfileUpdateAwardsDialogComponent');
          addAwardsModelComponentRef.close(this.form);
        })
        .catch(error => {

        });
      } else {
        this.userApiService.promiseAddAwards(this.form)
        .then((res) => {
          let addAwardsModelComponentRef = this.dialog.getDialogById('ProfileAddAwardsDialogComponent');
          addAwardsModelComponentRef.close(this.form);
        })
        .catch(error => {

        });
      }
    }
  }
}

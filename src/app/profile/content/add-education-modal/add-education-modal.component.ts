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
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss']
})
export class ProfileAddEducationDialogComponent implements OnInit {

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
    if (this.data.education) {
      this.form = this.data.education;
      this.isEdit = true;
    }
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.form.name && this.form.level && this.form.from && this.form.to) {
      if (this.isEdit) {
        this.userApiService.promiseUpdateEducation(this.form)
        .then((res) => {
          let addEducationModelComponentRef = this.dialog.getDialogById('ProfileUpdateEducationDialogComponent');
          addEducationModelComponentRef.close(this.form);
        })
        .catch(error => {

        });
      } else {
        this.userApiService.promiseAddEducation(this.form)
        .then((res) => {
          let addEducationModelComponentRef = this.dialog.getDialogById('ProfileAddEducationDialogComponent');
          addEducationModelComponentRef.close(this.form);
        })
        .catch(error => {

        });
      }
    }
  }
}

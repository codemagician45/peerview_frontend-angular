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
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss']
})
export class ProfileAddExperienceDialogComponent implements OnInit {

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
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.form.name && this.form.role && this.form.from && this.form.to) {
      this.userApiService.promiseAddWorkExperience(this.form)
        .then((res) => {
          let addExperienceModelComponentRef = this.dialog.getDialogById('ProfileAddExperienceDialogComponent');
          addExperienceModelComponentRef.close(this.form);
        })
        .catch(error => {

        });
    }
  }
}

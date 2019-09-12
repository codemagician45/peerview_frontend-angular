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
  UserApiService, SkillApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'app-add-gpa-modal',
  templateUrl: './add-gpa-modal.component.html',
  styleUrls: ['./add-gpa-modal.component.scss']
})
export class ProfileAddGPADialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService,
    private skillApiService: SkillApiService
  ) {}

  private user: UserModel = new UserModel();
  private gpa: string = '';
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
    if (this.data.gpa) {
      this.gpa = this.data.gpa;
    }
  }

  public ngAfterViewInit (): void {}

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.gpa) {
      let data = {
        gpa: this.gpa
      };

      this.userApiService.promiseSaveGPA(data)
        .then(() => {
          let addGpaModelComponentRef = this.dialog.getDialogById('ProfileAddGPADialogComponent');
          addGpaModelComponentRef.close(this.gpa);
        })
        .catch(error => {

        });
    }
  }
}

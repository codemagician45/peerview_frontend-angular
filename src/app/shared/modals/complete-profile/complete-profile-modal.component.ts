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
  UserModel, ProfileCompleteModel
} from '../../models';
import { Router } from '@angular/router';
import { CheckProfileCompletionService } from '../../../../services';

@Component({
  selector: 'app-complete-profile-modal',
  templateUrl: './complete-profile-modal.component.html',
  styleUrls: ['./complete-profile-modal.component.scss']
})
export class CompleteProfileDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    public data: ProfileCompleteModel,
    private dialog: MatDialog,
    private router: Router,
    private checkProfileIncompletion: CheckProfileCompletionService
  ) {}

  public ngOnInit (): void {
    console.log(this.data);
  }

  protected onCancel (): void {
    let model = new ProfileCompleteModel;
    model.status = false;
    this.checkProfileIncompletion.setStatus(model);
    this.dialog.closeAll();
  }

  protected onSave (): void {
    let model = new ProfileCompleteModel;
    model.status = false;
    this.checkProfileIncompletion.setStatus(model);
    this.dialog.closeAll();
    let modalType = 0;
    if (this.data.aboutme) {
      modalType = 0;
    } else if (this.data.workExperience) {
      modalType = 1;
    } else {
      modalType = 2;
    }
    this.router.navigate([`/profile`], { queryParams: { mt: modalType } });
  }
}

import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  UserApiService
} from '../../../services/api';
import {
  UserService
} from '../../../services';
import {
  PostModel,
  UserModel
} from '../../shared/models';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ProfileAddExperienceDialogComponent } from './add-experience-modal/add-experience-modal.component';
import { ProfileAddSkillsDialogComponent } from './add-skills-modal/add-skills-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  constructor () {}

  @Input() protected user: UserModel;
  protected isUserProfile: boolean = true;

  public ngOnInit (): void {
    let currentLoginUser = UserService.getUser();

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }

  }

  protected onShowPostDetailDialogComponent (): void {}
}

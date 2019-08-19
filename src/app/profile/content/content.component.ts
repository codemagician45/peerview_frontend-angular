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

@Component({
  selector: 'profile-content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected user: UserModel;
  protected posts: PostModel[] = [];
  
  public ngOnInit (): void {
    this.getUserTimeline();
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getUserTimeline (): void {
    this.userApiService.promiseGetTimeline(this.user.id)
      .then((posts: PostModel[]) => {
        this.posts = posts;
      })
      .catch(error => {});
  }

  private openAddExperienceDialog (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-experience-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: 'test',
      source: 'profile-picture'
    };
    this.dialog.open(ProfileAddExperienceDialogComponent, dialogConfig);
  }

  private openAddSkillsDialog (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-skills-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: 'test',
      source: 'profile-picture'
    };
    this.dialog.open(ProfileAddSkillsDialogComponent, dialogConfig);
  }
}


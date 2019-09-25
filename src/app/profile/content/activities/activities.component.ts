import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';
import {
  PostModel,
  UserModel
} from '../../../shared/models';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ProfileAddExperienceDialogComponent } from '../add-experience-modal/add-experience-modal.component';
import { ProfileAddSkillsDialogComponent } from '../add-skills-modal/add-skills-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-content-activities-component',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ProfileContentActivitiesComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected user: UserModel;
  protected posts: PostModel[] = [];
  protected isUserProfile: boolean = true;
  private otherUserSubscriber: Subscription;

  public ngOnInit (): void {
    this.getUserTimeline();
    let currentLoginUser = UserService.getUser();

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }

    this.otherUserSubscriber = UserService.getOtherUserSubject().subscribe((user: UserModel) => {
      this.user = user;
      this.getUserTimeline();
      this.isUserProfile = false;
    });
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getUserTimeline (): void {
    this.userApiService.promiseGetTimeline(this.user.id, 10, 0)
      .then((posts: PostModel[]) => {
        this.posts = posts;
      })
      .catch(error => {});
  }

  public ngOnDestroy (): void {
    this.otherUserSubscriber.unsubscribe();
  }
}


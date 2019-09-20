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
import { ProfileAddGPADialogComponent } from '../add-gpa-modal/add-gpa-modal.component';

@Component({
  selector: 'profile-content-accomplishments-component',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class ProfileContentAccomplishmentsComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected user: UserModel;
  protected posts: PostModel[] = [];
  protected workExperiences: any[] = [];
  protected userSkills: any[] = [];
  protected isUserProfile: boolean = true;
  protected gpa: any;

  public ngOnInit (): void {
    this.getWorkExperience();
    this.getUserSkill();
    let currentLoginUser = UserService.getUser();

    this.gpa = currentLoginUser.gpa;

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getWorkExperience (): void {
    this.userApiService.promiseGetWorkExperience(this.user.id)
      .then((workExperiences: any[]) => {
        this.workExperiences = workExperiences;
      })
      .catch(error => {});
  }

  private getUserSkill (): void {
    this.userApiService.promiseGetSkill(this.user.id)
      .then((skills: any[]) => {
        skills.map((item, index) => {
          this.userSkills.push(item.skill);
        });
      })
      .catch(error => {});
  }

  private openAddExperienceDialog (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-experience-modal';
    dialogConfig.id = 'ProfileAddExperienceDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: 'test',
      source: 'profile-picture'
    };
    this.dialog.open(ProfileAddExperienceDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (!data) { return; }
      this.workExperiences.push(data);
    });
  }

  private openUpdateExperienceDialog (experience: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-experience-modal';
    dialogConfig.id = 'ProfileUpdateExperienceDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      experience: experience
    };
    this.dialog.open(ProfileAddExperienceDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (!data) { return; }
      let index = this.workExperiences.indexOf(experience);
      this.workExperiences[index] = data;
    });
  }

  private openAddSkillsDialog (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-skills-modal';
    dialogConfig.id = 'ProfileAddSkillsDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      userSkills:  this.userSkills
    };
    this.dialog.open(ProfileAddSkillsDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(skills => {
      if (!skills) { return; }
      this.userSkills = skills;
    });
  }

  private openAddGpaDialog (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-gpa-modal';
    dialogConfig.id = 'ProfileAddGPADialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      gpa:  this.gpa
    };
    this.dialog.open(ProfileAddGPADialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(gpa => {
      if (!gpa) { return; }
      this.gpa = gpa;
      let currentLoginUser = UserService.getUser();
      currentLoginUser.gpa = gpa;
      UserService.setUser(currentLoginUser);
    });
  }
}


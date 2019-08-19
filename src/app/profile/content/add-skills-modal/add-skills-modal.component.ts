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
  selector: 'app-add-skills-modal',
  templateUrl: './add-skills-modal.component.html',
  styleUrls: ['./add-skills-modal.component.scss']
})
export class ProfileAddSkillsDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  private user: UserModel = new UserModel();
  private skillsArray = [
    {
      id: 0,
      name: 'Hello World'
    },
    {
      id: 1,
      name: 'Hello World2'
    },
    {
      id: 2,
      name: 'Hello World3'
    },
    {
      id: 3,
      name: 'Hello World4'
    },
    {
      id: 4,
      name: 'Hello World5'
    },
    {
      id: 5,
      name: 'Alax Lu'
    },
    {
      id: 6,
      name: 'Alax Lu2'
    },
    {
      id: 7,
      name: 'Alax Lu3'
    },
    {
      id: 8,
      name: 'Alaxiom Lu'
    },
    {
      id: 9,
      name: 'Alaxiom Lu2'
    },
    {
      id: 10,
      name: 'Alaxiom Lu3'
    },
    {
      id: 11,
      name: 'Bellow Tom'
    },
    {
      id: 12,
      name: 'Bellow Tom2'
    },
    {
      id: 13,
      name: 'Bellow Tom3'
    },
    {
      id: 14,
      name: 'Bellow Tom4'
    }
  ];
  private skillText: string = '';
  private selectedSkills = [];
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.data) {
      this.user.assimilate({
        aboutMe: this.data
      });

      this.userApiService.promiseUpdateAboutMe(this.user)
        .then(() => {
          let aboutModelComponentRef = this.dialog.getDialogById('ProfileAddSkillsDialogComponent');
          aboutModelComponentRef.close(this.data);
        })
        .catch(error => {

        });
    }
  }

  private closeList (): void {
    this.skillText = '';
  }

  private addSkill (skill: any): void {
    this.selectedSkills.push(skill);
  }

  private removeSkill (skill: any): void {
    let index = this.selectedSkills.indexOf(skill);
    this.selectedSkills.splice(index, 1);
  }
}

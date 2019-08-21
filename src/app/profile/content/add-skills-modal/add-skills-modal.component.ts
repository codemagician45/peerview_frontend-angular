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
  selector: 'app-add-skills-modal',
  templateUrl: './add-skills-modal.component.html',
  styleUrls: ['./add-skills-modal.component.scss']
})
export class ProfileAddSkillsDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService,
    private skillApiService: SkillApiService
  ) {}

  private user: UserModel = new UserModel();
  private skillsArray: any[] = [];
  private skillText: string = '';
  private selectedSkills: any[] = [];
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
    this.selectedSkills = this.data.userSkills;
  }

  public ngAfterViewInit (): void {
    setTimeout(() => {
      this.getAllSkill();
    });
  }

  private getAllSkill (): void {
    this.skillApiService.promiseGetSkill()
      .then((skills: any[]) => {
        this.skillsArray = skills;
      })
      .catch(error => {});
  }

  protected checkNewSkill (txt: string): boolean {
    if (txt && txt.length > 2) {
      for (let i = 0; i < this.skillsArray.length; i ++) {
        if (this.skillsArray[i].name.toLocaleLowerCase() === txt.toLocaleLowerCase()) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  protected addNewSkill (txt: string): void {
    let data = {
      name: txt
    };

    this.skillApiService.promiseAddSkill(data)
      .then((res) => {
        this.skillsArray.push(res);
        this.skillText = '';
        this.selectedSkills.push(res);
      })
      .catch(error => {

      });
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.selectedSkills.length > 0) {
      let data = {
        items: this.selectedSkills
      };

      this.userApiService.promiseAddSkill(data)
        .then(() => {
          let addSkillModelComponentRef = this.dialog.getDialogById('ProfileAddSkillsDialogComponent');
          addSkillModelComponentRef.close(this.selectedSkills);
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

import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../../../../services';
import {
  UserStudyLevelModel,
  UserStudyLevelsResponse
} from '../../../shared/models';

@Component({
  selector: 'community-tab-menu-component',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class CommunityTabMenuComponent implements OnInit {
  constructor (private userService: UserService) {}

  protected useStudyLevels: Array<UserStudyLevelModel>;

  public ngOnInit (): void {
    this.getUserStudyLevels();
  }

  private getUserStudyLevels (): void {
    this.userService.getUserStudyLevels()
    .subscribe((response: UserStudyLevelsResponse) => {
      this.useStudyLevels = response.userStudyLevels;
    });
  }
}

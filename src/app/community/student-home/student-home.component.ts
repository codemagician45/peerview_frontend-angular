import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommunityService
} from '../../../services/services';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  constructor (private communityService: CommunityService) {}

  protected publicgroups: any[] = [{
    name: 'Public group name 1',
    description: 'Public group description 1'
  }, {
    name: 'Public group name 2',
    description: 'Public group description 2'
  }];

  protected mygroups: any[] = [{
    name: 'My group name 1',
    description: 'My group description 1'
  }, {
    name: 'My group name 2',
    description: 'My group description 2'
  }];

  public ngOnInit (): void {
    this.communityService.getuserclubs()
    .subscribe((response: any) => {
      this.mygroups = response.campusStudentGroups;
    }, error => {
      console.log(error);
    });

    this.communityService.getsocietyclubs()
    .subscribe((response: any) => {
      this.publicgroups = response.campusStudentGroups;
    }, error => {
      console.log(error);
    });
  }
}

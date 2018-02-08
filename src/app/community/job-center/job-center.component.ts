import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommunityService
} from '../../../services/services';

@Component({
  selector: 'app-job-center',
  templateUrl: './job-center.component.html',
  styleUrls: ['./job-center.component.scss']
})
export class JobCenterComponent implements OnInit {
  constructor (private _communityservice: CommunityService) {}

  protected jobs: any[] = [];

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }

    this._communityservice.getjobs()
    .subscribe((response: any) => {
      this.jobs = response.campusJobs;
    }, error => {
      console.log(error);
    });
  }
}

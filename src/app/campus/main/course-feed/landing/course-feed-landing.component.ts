import {
  Component,
  OnInit
} from '@angular/core';
import {
  CourseApiService
} from '../../../../../services/api';

@Component({
  selector: 'campus-course-feed-landing-component',
  templateUrl: './course-feed-landing.component.html',
  styleUrls: ['./course-feed-landing.component']
})
export class CampusCourseFeedLandingComponent implements OnInit {
  constructor (
    private courseApiService: CourseApiService
  ) {}

  public ngOnInit (): void {}

  public getCourses (): void {

  }
}

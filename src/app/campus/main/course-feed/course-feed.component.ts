import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusFreshersFeedModel
} from '../../../shared/models';
import {
  CampusApiService
} from '../../../../services/api';

@Component({
   selector: 'campus-course-feed-main-component',
  templateUrl: './course-feed.component.html',
  styleUrls: ['./course-feed.component.scss']
})
export class CampusCourseFeedComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected courseFeedposts: Array<CampusFreshersFeedModel> = [];
  protected campusId: number;

  public ngOnInit (): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
      // this.getCampusPosts();
    });
  }
}

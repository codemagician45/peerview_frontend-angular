/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  CampusComponent
} from './campus.component';
import {
  CampusLandingPageComponent
} from './landing-page/landing-page.component';
import {
  campusRouting
} from './campus-routing.component';
import {
  CampusLeftSidebarComponent
} from './components/left-sidebar/left-sidebar.component';
import {
  CampusAllStudentsComponent
} from './main/all-students/all-students.component';
import {
  CampusMainComponent
} from './main/main.component';
import {
  CampusFreshersFeedComponent
} from './main/freshers-feed/freshers-feed.component';
import {
  CampusFreshersFeedLandingComponent
} from './main/freshers-feed/landing/freshers-feed-landing.component';
import {
  CampusFreshersFeedMainComponent
} from './main/freshers-feed/main/freshers-feed-main.component';
import {
  CampusCourseFeedComponent
} from './main/course-feed/course-feed.component';
import {
  CampusApiService
} from '../../services/api/campus.api.service';

@NgModule({
  imports : [
    SharedModule,
    campusRouting
  ],
  declarations : [
    CampusComponent,
    CampusLandingPageComponent,
    CampusLeftSidebarComponent,
    CampusAllStudentsComponent,
    CampusFreshersFeedComponent,
    CampusFreshersFeedLandingComponent,
    CampusFreshersFeedMainComponent,
    CampusCourseFeedComponent,
    CampusMainComponent
  ],
  exports: [],
  providers: [CampusApiService]
})
export class CampusModule {}


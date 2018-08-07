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
  CampusRightSidebarComponent
} from './components/right-sidebar/right-sidebar.component';
import {
  MobileCampusNavComponent
} from './components/mobile-campus-nav/mobile-campus-nav.component';
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
  CampusCourseFeedLandingComponent
} from './main/course-feed/landing/course-feed-landing.component';
import {
  CampusCourseFeedMainComponent
} from './main/course-feed/main/course-feed-main.component';
import {
  CampusClassesComponent
} from './main/classes/classes.component';
import {
  CampusClassesLandingComponent
} from './main/classes/landing/classes-landing.component';
import {
  CampusClassesMainComponent
} from './main/classes/main/classes-main.component';
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
    CampusRightSidebarComponent,
    MobileCampusNavComponent,
    CampusAllStudentsComponent,
    CampusFreshersFeedComponent,
    CampusFreshersFeedLandingComponent,
    CampusFreshersFeedMainComponent,
    CampusCourseFeedComponent,
    CampusCourseFeedLandingComponent,
    CampusCourseFeedMainComponent,
    CampusClassesComponent,
    CampusClassesLandingComponent,
    CampusClassesMainComponent,
    CampusMainComponent
  ],
  exports: [],
  providers: [CampusApiService]
})
export class CampusModule {}


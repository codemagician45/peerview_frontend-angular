import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  CommunityComponent
} from './community/community.component';
import {
  CommunityRoutingModule
} from './community-routing.module';
import {
  RegisterComponent
} from './register/register.component';
import {
  AcsComponent
} from './acs/acs.component';
import {
  ClassComponent
} from './class/class.component';
import {
  ClassesDetailComponent
} from './classes-detail/classes-detail.component';
import {
  ClassesListComponent
} from './classes-list/classes-list.component';
import {
  CourseListComponent
} from './course-list/course-list.component';
import {
  FeedComponent
} from './feed/feed.component';
import {
  GroupComponent
} from './group/group.component';
import {
  JobCenterComponent
} from './job-center/job-center.component';
import {
  SocitiesComponent
} from './socities/socities.component';
import {
  YearEnrollmentComponent
} from './year-enrollment/year-enrollment.component';
import {
  FreshersHomeComponent
} from './freshers-home/freshers-home.component';
import {
  PeersOnlineComponent
} from './shared/peers-online/peers-online.component';
import {
  SharedModule
} from '../shared/shared.module';
import {
  ClubListComponent
} from './club-list/club-list.component';
import {
  CoursesFeedComponent
} from './courses-feed/courses-feed.component';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  StudentHomeComponent
} from './student-home/student-home.component';
import {
  BrainstormingMapComponent
} from './shared/brainstorming-map/brainstorming-map.component';
import {
  ActivePollComponent
} from './shared/active-poll/active-poll.component';
import {
  OpenJoinComponent
} from './shared/modals/components/OpenJoinComponent';
import {
  OpenInviteComponent
} from './shared/modals/components/OpenInviteComponent';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    CommunityComponent,
    RegisterComponent,
    AcsComponent,
    ClassComponent,
    ClassesDetailComponent,
    ClassesListComponent,
    CourseListComponent,
    FeedComponent,
    GroupComponent,
    JobCenterComponent,
    SocitiesComponent,
    YearEnrollmentComponent,
    FreshersHomeComponent,
    PeersOnlineComponent,
    ClubListComponent,
    CoursesFeedComponent,
    StudentHomeComponent
  ],
  exports: [
    PeersOnlineComponent
  ]
})
export class CommunityModule {}

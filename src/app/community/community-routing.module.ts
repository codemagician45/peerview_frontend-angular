import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  CommunityComponent
} from './community/community.component';
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
  GroupComponent
} from './group/group.component';
import {
  RegisterComponent
} from './register/register.component';
import {
  ClubListComponent
} from './club-list/club-list.component';
import {
  CoursesFeedComponent
} from './courses-feed/courses-feed.component';
import {
  StudentHomeComponent
} from './student-home/student-home.component';

const routes: Routes = [{
  path: '',
  component: CommunityComponent
}, {
  path: 'acs',
  component: AcsComponent
}, {
  path: 'class',
  component: ClassComponent
}, {
  path: 'classes-detail',
  component: ClassesDetailComponent
}, {
  path: 'classes-list',
  component: ClassesListComponent
}, {
  path: 'course-list',
  component: CourseListComponent
}, {
  path: 'feed',
  component: FeedComponent
}, {
  path: 'group',
  component: GroupComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'job-center',
  component: JobCenterComponent
}, {
  path: 'societies',
  component: SocitiesComponent
}, {
  path: 'year-enrollment',
  component: YearEnrollmentComponent
}, {
  path: 'freshers-home',
  component: FreshersHomeComponent
}, {
  path: 'club-list',
  component: ClubListComponent
}, {
  path: 'courses-feed',
  component: CoursesFeedComponent
}, {
  path: 'student-home',
  component: StudentHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {}

import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CommunityComponent
} from './community.component';
import {
  StudentCommunityComponent
} from './student-community/student-community.component';
import {
  PrivateCommunityComponent
} from './private-community/private-community.component';

const communityRoutes: Routes = [{
  path: '',
  component: CommunityComponent,
  children: [ {
    path: 'student-community',
    component: StudentCommunityComponent
  }, {
    path: 'private-community',
    component: PrivateCommunityComponent
  }]
}];

export const communityRouting: ModuleWithProviders = RouterModule.forChild(communityRoutes);

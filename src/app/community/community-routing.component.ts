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

const communityRoutes: Routes = [{
  path: '',
  component: CommunityComponent
}];

export const communityRouting: ModuleWithProviders = RouterModule.forChild(communityRoutes);

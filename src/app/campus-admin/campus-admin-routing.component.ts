import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CampusAdminLandingPageComponent
} from './landing-page/landing-page.component';
import {
  CampusAdminComponent
} from './campus-admin.component';
// import {
//   CanActivateOtherProfile
// } from './check-if-other-profile';

const campusAdminRoutes: Routes = [{
  path: '',
  component: CampusAdminLandingPageComponent,
  // canActivate: [CanActivateOtherProfile]]
}, {
  path: 'dashboard',
  component: CampusAdminComponent,
  // canActivate: [CanActivateOtherProfile]
  children: []
}];

export const campusAdminRouting: ModuleWithProviders = RouterModule.forChild(campusAdminRoutes);

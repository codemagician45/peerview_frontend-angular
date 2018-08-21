import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CampusAdminComponent
} from './campus-admin.component';
// import {
//   CanActivateOtherProfile
// } from './check-if-other-profile';

const campusAdminRoutes: Routes = [{
  path: '',
  component: CampusAdminComponent,
  // canActivate: [CanActivateOtherProfile]
}];

export const campusAdminRouting: ModuleWithProviders = RouterModule.forChild(campusAdminRoutes);

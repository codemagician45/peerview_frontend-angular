import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProfileComponent
} from './profile.component';

const profileRoutes: Routes = [{
  path: '',
  component: ProfileComponent// profile of currently login user,
}, {
  path: ':id',
  component: ProfileComponent
}];

export const profileRouting: ModuleWithProviders = RouterModule.forChild(profileRoutes);

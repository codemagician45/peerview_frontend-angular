import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CampusComponent
} from './campus.component';

const campusRoutes: Routes = [{
  path: '',
  component: CampusComponent
}];

export const campusRouting: ModuleWithProviders = RouterModule.forChild(campusRoutes);

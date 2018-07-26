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
import {
  CampusLandingPageComponent
} from './landing-page/landing-page.component';
import {
  CampusAllStudentsComponent
} from './main/all-students/all-students.component';
import {
  CampusMainComponent
} from './main/main.component';

const campusRoutes: Routes = [{
  path: '',
  component: CampusComponent,
  children: [{
    path: '',
    component: CampusLandingPageComponent
  }, {
    path: ':id',
    component: CampusMainComponent,
    children: [{
      path: 'all-students',
      component: CampusAllStudentsComponent
    }]
  }]
}];

export const campusRouting: ModuleWithProviders = RouterModule.forChild(campusRoutes);

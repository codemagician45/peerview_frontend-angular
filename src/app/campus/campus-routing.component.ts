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
  CampusAllStudentsComponent
} from './all-students/all-students.component';

const campusRoutes: Routes = [{
  path: '',
  component: CampusComponent,
  children: [{
    path: 'all-students',
    component: CampusAllStudentsComponent
  }]
}];

export const campusRouting: ModuleWithProviders = RouterModule.forChild(campusRoutes);

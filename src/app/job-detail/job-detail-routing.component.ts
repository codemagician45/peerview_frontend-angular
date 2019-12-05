import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  JobDetailComponent
} from './job-detail.component';

const jobDetailRoutes: Routes = [{
  path: ':id',
  component: JobDetailComponent
}];

export const jobDetailRouting: ModuleWithProviders = RouterModule.forChild(jobDetailRoutes);

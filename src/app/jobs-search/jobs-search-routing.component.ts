import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  JobsSearchComponent
} from './jobs-search.component';

const jobsSearchRoutes: Routes = [{
  path: '',
  component: JobsSearchComponent
}];

export const jobsSearchRouting: ModuleWithProviders = RouterModule.forChild(jobsSearchRoutes);

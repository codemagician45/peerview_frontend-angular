import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  EmployersComponent
} from './employers.component';

const employersRoutes: Routes = [{
  path: '',
  component: EmployersComponent
}];

export const employersRouting: ModuleWithProviders = RouterModule.forChild(employersRoutes);

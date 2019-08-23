import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CreateAdComponent
} from './create-ad.component';

const createAdRoutes: Routes = [{
  path: '',
  component: CreateAdComponent
}];

export const createAdRouting: ModuleWithProviders = RouterModule.forChild(createAdRoutes);

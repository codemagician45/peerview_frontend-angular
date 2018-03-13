import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  IndexComponent
} from './index.component';
import {
  IsProtectedCompnent
} from '../shared/can-activate';

const indexRoutes: Routes = [{
  path: '',
  component: IndexComponent,
  data: {
    isProtected: false
  },
  canActivate: [IsProtectedCompnent]
}];

export const indexRouting: ModuleWithProviders = RouterModule.forChild(indexRoutes);

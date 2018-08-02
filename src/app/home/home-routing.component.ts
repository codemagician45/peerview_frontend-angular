import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  IsProtectedComponent
} from '../shared/can-activate';

import {
  HomeComponent
} from './home.component';

const homeRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  data: {
    isProtected: true
  },
  canActivate: [IsProtectedComponent]
}];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

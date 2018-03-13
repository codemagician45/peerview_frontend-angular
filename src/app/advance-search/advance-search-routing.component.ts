import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  AdvanceSearchComponent
} from './advance-search.component';

const advanceSearchRoutes: Routes = [{
  path: '',
  component: AdvanceSearchComponent
}];

export const advanceSearchRouting: ModuleWithProviders = RouterModule.forChild(advanceSearchRoutes);

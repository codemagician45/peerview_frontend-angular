import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {HelpCenterComponent} from './help-center.component';

const helpCenterRoutes: Routes = [{
  path: '',
  component: HelpCenterComponent
}];

export const helpCenterRouting: ModuleWithProviders = RouterModule.forChild(helpCenterRoutes);

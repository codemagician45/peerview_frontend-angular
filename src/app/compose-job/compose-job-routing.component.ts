import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ComposeJobComponent
} from './compose-job.component';
import { CanActivateJobCompose } from './checkIfOraganization';

const composeJobRoutes: Routes = [{
  path: '',
  component: ComposeJobComponent,
  canActivate: [CanActivateJobCompose]
}];

export const composeJobRouting: ModuleWithProviders = RouterModule.forChild(composeJobRoutes);

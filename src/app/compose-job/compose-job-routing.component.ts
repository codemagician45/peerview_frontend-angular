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

const composeJobRouting: Routes = [{
  path: '',
  component: ComposeJobComponent
}];

export const composeJobRouting: ModuleWithProviders = RouterModule.forChild(composeJobRouting);

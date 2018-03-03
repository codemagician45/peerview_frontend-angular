import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  UserComponent
} from './user.component';
import {
  UserVerifyEmailComponent
} from './verify-email/verify-email.component';
import {
  UserOnboardingComponent
} from './on-boarding/on-boarding.component';
import {
  UserOnboardingSelectStatusComponent
} from './on-boarding/select-status/select-status.component';

const userRoutes: Routes = [{
  path: '',
  component: UserComponent
}, {
  path: 'verify-email',
  component: UserVerifyEmailComponent
}, {
  path: 'on-boarding',
  component: UserOnboardingComponent,
  children: [{
    path: 'status',
    component: UserOnboardingSelectStatusComponent
  }]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

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

const userRoutes: Routes = [{
  path: '',
  component: UserComponent
}, {
  path: 'verify-email',
  component: UserVerifyEmailComponent
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

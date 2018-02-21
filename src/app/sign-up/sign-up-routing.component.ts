import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  SignUpComponent
} from './sign-up.component';

const signUpRoutes: Routes = [{
  path: '',
  component: SignUpComponent
}];

export const signUpRouting: ModuleWithProviders = RouterModule.forChild(signUpRoutes);

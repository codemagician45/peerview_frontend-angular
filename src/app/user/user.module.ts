import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  userRouting
} from './user-routing.component';
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

@NgModule({
  imports: [
    SharedModule,
    userRouting
  ],
  declarations: [
    UserComponent,
    UserVerifyEmailComponent,
    UserOnboardingComponent,
    UserOnboardingSelectStatusComponent
  ],
  exports: []
})
export class UserModule {}

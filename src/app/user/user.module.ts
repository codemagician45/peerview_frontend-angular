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

@NgModule({
  imports: [
    SharedModule,
    userRouting
  ],
  declarations: [
    UserComponent,
    UserVerifyEmailComponent
  ],
  exports: []
})
export class UserModule {}

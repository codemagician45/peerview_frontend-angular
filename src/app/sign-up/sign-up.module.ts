/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  SignUpComponent
} from './sign-up.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  SharedDirectiveModule
} from '../shared/directives/shared-directive.module';
import {
  signUpRouting
} from './sign-up-routing.component';

@NgModule({
  imports : [
    SharedModule,
    SharedDirectiveModule,
    signUpRouting
  ],
  declarations : [
    SignUpComponent
  ],
  exports: []
})
export class SignUpModule {}

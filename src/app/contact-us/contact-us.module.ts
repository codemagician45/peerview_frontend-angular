/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  ContactUsComponent
} from './contact-us.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  contactUsRouting
} from './contact-us-routing.component';

@NgModule({
  imports : [
    SharedModule,
    contactUsRouting
  ],
  declarations : [
    ContactUsComponent
  ],
  exports: []
})
export class ContactUsModule {}

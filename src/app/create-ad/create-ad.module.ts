/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CreateAdComponent
} from './create-ad.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  createAdRouting
} from './create-ad-routing.component';
import {
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';

@NgModule({
  imports : [
    SharedModule,
    PerfectScrollbarModule,
    createAdRouting
  ],
  declarations : [
    CreateAdComponent
  ],
  exports: [],
  providers: []
})
export class CreateAdModule {}

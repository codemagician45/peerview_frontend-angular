/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  EmployersComponent
} from './employers.component';
import {
  EmployersIndexPageComponent
} from './index-page/index-page.component';
import {
  EmployersCommunityComponent
} from './community/community.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  employersRouting
} from './employers-routing.component';

@NgModule({
  imports : [
    SharedModule,
    employersRouting
  ],
  declarations : [
    EmployersComponent,
    EmployersIndexPageComponent,
    EmployersCommunityComponent
  ],
  exports: []
})
export class EmployersModule {}

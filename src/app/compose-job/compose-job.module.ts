/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  ComposeJobComponent
} from './compose-job.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  composeJobRouting
} from './compose-job-routing.component';
import { JobApiService } from '../../services/api';
import { CanActivateJobCompose } from './checkIfOraganization';

@NgModule({
  imports : [
    SharedModule,
    composeJobRouting
  ],
  declarations : [
    ComposeJobComponent
  ],
  exports: [],
  providers: [ CanActivateJobCompose ]
})
export class ComposeJobModule {}

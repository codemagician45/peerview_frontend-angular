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

@NgModule({
  imports : [
    SharedModule,
    composeJobRouting
  ],
  declarations : [
    ComposeJobComponent
  ],
  exports: [],
  providers: []
})
export class ComposeJobModule {}

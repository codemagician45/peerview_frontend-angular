/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  JobDetailComponent
} from './job-detail.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  jobDetailRouting
} from './job-detail-routing.component';

@NgModule({
  imports : [
    SharedModule,
    jobDetailRouting
  ],
  declarations : [
    JobDetailComponent
  ],
  exports: [],
  providers: []
})
export class JobDetailModule {}

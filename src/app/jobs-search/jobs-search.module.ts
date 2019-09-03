/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  JobsSearchComponent
} from './jobs-search.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  jobsSearchRouting
} from './jobs-search-routing.component';

@NgModule({
  imports : [
    SharedModule,
    jobsSearchRouting
  ],
  declarations : [
    JobsSearchComponent
  ],
  exports: [],
  providers: []
})
export class JobsSearchModule {}

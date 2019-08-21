/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedFilterPipeComponent
} from './filter.pipe';
import {
  SharedLocalDatePipeComponent
} from './local-date.pipe';
import {
  SearchTextPipe
} from './search-text.pipe';
import {
  SharedAvailablePostPipeComponent
} from './available-post.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent
  ]
})
export class SharedPipeModule {}

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

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe
  ]
})
export class SharedPipeModule {}

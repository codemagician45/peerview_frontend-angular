/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedFilterPipeComponent
} from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent
  ],
  exports: [
    SharedFilterPipeComponent
  ]
})
export class SharedPipeModule {}

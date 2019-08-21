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
import {
  SharedLinkPreviewPipeComponent
} from './link-preview.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent
  ]
})
export class SharedPipeModule {}

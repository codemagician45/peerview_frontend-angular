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
import {
  SharedAvailableNotificationPipeComponent
} from './available-notification.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent,
    SharedAvailableNotificationPipeComponent
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent,
    SharedAvailableNotificationPipeComponent
  ]
})
export class SharedPipeModule {}

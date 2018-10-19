/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/

import {
  MessagesComponent
} from './messages.component';
// import {
//   NotificationRightSidebarComponent
// } from './right-sidebar/right-sidebar.component';

import {
  SharedModule
} from '../shared/components/shared.module';
import {
  messagesRouting
} from './messages-routing.component';

@NgModule({
  imports : [
    SharedModule,
    messagesRouting
  ],
  declarations : [
    MessagesComponent,
    // NotificationRightSidebarComponent
  ],
  exports: []
})
export class MessagesModule {}

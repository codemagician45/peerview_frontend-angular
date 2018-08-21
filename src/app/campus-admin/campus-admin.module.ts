/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CampusAdminComponent
} from './campus-admin.component';
import {
  LeftSidebarComponent
} from './left-sidebar/left-sidebar.component';
import {
  CampusAdminContentsComponent
} from './contents/contents.component';

import {
  SharedModule
} from '../shared/components/shared.module';
import {
  campusAdminRouting
} from './campus-admin-routing.component';

@NgModule({
  imports : [
    SharedModule,
    campusAdminRouting
  ],
  declarations : [
    CampusAdminComponent,
    LeftSidebarComponent,
    CampusAdminContentsComponent
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class CampusAdminModule {}

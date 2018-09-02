/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CampusAdminLandingPageComponent
} from './landing-page/landing-page.component';
import {
  CampusAdminComponent
} from './campus-admin.component';
import {
  LeftSidebarComponent
} from './components/left-sidebar/left-sidebar.component';
import {
  CampusAdminContentsComponent
} from './components/contents/contents.component';
import {
  CampusAdminDashBoard
} from './components/dashboard/dashboard.component';

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
    CampusAdminLandingPageComponent,
    CampusAdminComponent,
    LeftSidebarComponent,
    CampusAdminContentsComponent,
    CampusAdminDashBoard
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class CampusAdminModule {}

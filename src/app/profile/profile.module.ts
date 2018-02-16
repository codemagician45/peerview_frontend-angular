/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  ProfileComponent
} from './profile.component';
import {
  ProfileLeftSidebarComponent
} from './left-sidebar/left-sidebar.component';
import {
  ProfileLeftSidebarUserInfoComponent
} from './left-sidebar/user-info/user-info.component';
import {
  ProfileLeftSidebarUserOtherInfoComponent
} from './left-sidebar/user-other-info/user-other-info.component';
import {
  ProfileRightSidebarComponent
} from './right-sidebar/right-sidebar.component';
import {
  ProfileContentComponent
} from './content/content.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  profileRouting
} from './profile-routing.component';

@NgModule({
  imports : [
    SharedModule,
    profileRouting
  ],
  declarations : [
    ProfileComponent,
    ProfileLeftSidebarComponent,
    ProfileLeftSidebarUserInfoComponent,
    ProfileLeftSidebarUserOtherInfoComponent,
    ProfileRightSidebarComponent,
    ProfileContentComponent
  ],
  exports: []
})
export class ProfileModule {}

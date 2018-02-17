/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  CommonModule/*use for *ngIf*/
} from '@angular/common';
import {
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
/*third party*/
import {
  CloudinaryModule,
  CloudinaryConfiguration,
  provideCloudinary
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  SharedSidebarFooterComponent
} from './sidebar-footer/sidebar-footer.component';
import {
  SharedNavBarComponent
} from './navbar/navbar.component';
import {
  NavbarMobileComponent
} from './navbar/mobile/mobile.component';
import {
  NavbarDesktopComponent
} from './navbar/desktop/desktop.component';
import {
  SharedPostOptionsComponent
} from './post-options/post-options.component';
import {
  SharedStarsComponent
} from './stars/stars.component';
import {
  SharedPeersYouMayKnowComponent
} from './peers-you-may-know/peers-you-may-know.component';
import {
  SharedPostTextareaComponent
} from './post-textarea/post-textarea.component';
import {
  SharedFolloweeComponent
} from './followee/followee.component';
import {
  SharedSocialComponent
} from './social/social.component';
import {
  SharedFollowersComponent
} from './followers/followers.component';
import {
  TimeAgoPipe
} from 'time-ago-pipe';
/*providers*/
import {
  UserService
} from '../../../services/user.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration),
  ],
  declarations: [
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    TimeAgoPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    CloudinaryModule,
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    TimeAgoPipe
  ],
  providers: [
    UserService
  ]
})
export class SharedModule {}

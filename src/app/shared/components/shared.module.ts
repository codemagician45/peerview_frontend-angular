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
  MAT_DIALOG_DATA,
  MatProgressBarModule
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
  AuthService,
  Angular2SocialLoginModule
} from 'angular2-social-login';
import {
  FileUploadModule
} from 'ng2-file-upload';
import {
  SharedSidebarFooterComponent
} from './sidebar-footer/sidebar-footer.component';
import {
  SharedNavBarComponent
} from './navbar/navbar.component';
import {
  SharedNavbarUnauthComponent
} from './navbar-unauth/navbar-unauth.component';
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
  SharedPostComponent
} from './post/post.component';
import {
  SharedUploadImageComponent
} from './upload-image/upload-image.component';
import {
  SharedReportPostComponent
} from './report-post/report.post.component';
import {
  CONFIG
} from '../../../config';
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
    Angular2SocialLoginModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration),
    FileUploadModule,
    MatProgressBarModule
  ],
  declarations: [
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedNavbarUnauthComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    SharedPostComponent,
    SharedUploadImageComponent,
    SharedReportPostComponent,
    TimeAgoPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    CloudinaryModule,
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedNavbarUnauthComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    SharedPostComponent,
    SharedUploadImageComponent,
    SharedReportPostComponent,
    TimeAgoPipe,
    MatProgressBarModule
  ],
  providers: [
    UserService,
    AuthService,
    {provide: Window, useValue: window}
  ]
})
export class SharedModule {
  constructor () {
    Angular2SocialLoginModule.loadProvidersScripts(CONFIG[CONFIG.environment].socialProviders);
  }
}

/*angular*/
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  HttpClientModule
} from '@angular/common/http';
/*third party*/
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  TimeAgoPipe
} from 'time-ago-pipe';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
/*components*/
import {
  AppNavBarUnauthComponent
} from './app-navbar-unauth/app-navbar-unauth.component';
import {
  SidebarFooterComponent
} from './sidebar-footer/sidebar-footer.component';
import {
  SidebarImageComponent
} from './sidebar-image/sidebar-image.component';
import {
  SocialWidgetComponent
} from './social-widget/social-widget.component';
import {
  FollowersComponent
} from './followers/followers.component';
import {
  FollowingComponent
} from './following/following.component';
import {
  PeersMayKnowComponent
} from './peers-may-know/peers-may-know.component';
import {
  ImportModule
} from '../import.module';
import {
  RouterModule
} from '@angular/router';
import {
  NewMessageModalComponent
} from './new-message-modal/new-message-modal.component';
import {
  NewMessageFormComponent
} from './new-message-form/new-message-form.component';
import {
  ShareModalComponent
} from './share-modal/share-modal.component';
import {
  FollowersFollowingComponent
} from './followers-following/followers-following.component';
import {
  CreateClubPageComponent
} from './create-club-page/create-club-page.component';
import {
  AboutMeModalComponent
} from './about-me-modal/about-me-modal.component';
import {
  PostPollMapComponent
} from './post-poll-map/post-poll-map.component';
import {
  FullBrainstormingMapComponent
} from './full-brainstorming-map/full-brainstorming-map.component';
import {
  PostToComponent
} from './post-to/post-to.component';
import {
  ShowImageComponent
} from './show-image/show-image.component';
import {
  UnfollowPopupComponent
} from './unfollow-popup/unfollow-popup.component';
import {
  ReportModalComponent
} from './report-modal/report-modal.component';
import {
  ReportModalUserComponent
} from './report-modal-user/report-modal-user.component';
import {
  StickyWidgetDirective
} from '../directives/sticky-widget.directive';
import {
  SharedModule
} from './components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    ImportModule,
    RouterModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations: [
    SidebarImageComponent, SidebarFooterComponent,
    AppNavBarUnauthComponent,
    SocialWidgetComponent,
    FollowersComponent,
    FollowingComponent,
    PeersMayKnowComponent,
    NewMessageFormComponent,
    NewMessageModalComponent,
    ShareModalComponent,
    FollowersFollowingComponent,
    CreateClubPageComponent,
    AboutMeModalComponent,
    PostPollMapComponent,
    FullBrainstormingMapComponent,
    PostToComponent,
    ShowImageComponent,
    UnfollowPopupComponent,
    ReportModalComponent,
    ReportModalUserComponent,
    StickyWidgetDirective
  ],
  exports: [
    SidebarImageComponent, SidebarFooterComponent,
    AppNavBarUnauthComponent,
    SocialWidgetComponent,
    FollowersComponent,
    FollowingComponent,
    PeersMayKnowComponent,
    NewMessageFormComponent,
    NewMessageModalComponent,
    ShareModalComponent,
    FollowersFollowingComponent,
    CreateClubPageComponent,
    AboutMeModalComponent,
    PostPollMapComponent,
    FullBrainstormingMapComponent,
    PostToComponent,
    ShowImageComponent,
    StickyWidgetDirective
  ],
  entryComponents: [
    NewMessageFormComponent,
    NewMessageModalComponent,
    ShareModalComponent,
    CreateClubPageComponent,
    AboutMeModalComponent,
    PostToComponent,
    ShowImageComponent,
    UnfollowPopupComponent,
    ReportModalComponent,
    ReportModalUserComponent
  ]
})
export class SharedModuleProxy {}

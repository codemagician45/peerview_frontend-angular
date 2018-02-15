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
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
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
    NgbModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration),
  ],
  declarations: [
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    TimeAgoPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CloudinaryModule,
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedPostOptionsComponent,
    SharedStarsComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    TimeAgoPipe
  ],
  providers: [
    UserService
  ]
})
export class SharedModule {}

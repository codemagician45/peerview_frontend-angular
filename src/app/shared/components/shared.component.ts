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
  SharedSidebarFooterComponent
} from './sidebar-footer/sidebar-footer.component';
import {
  SharedNavBarComponent
} from './navbar/navbar.component';
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
  TimeAgoPipe
} from 'time-ago-pipe';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations: [
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    TimeAgoPipe
  ],
  exports: [
    CommonModule,
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    TimeAgoPipe
  ],
  providers: []
})
export class SharedModule {}

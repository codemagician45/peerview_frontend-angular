/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CommunityComponent
} from './community.component';
import {
  CommunityLeftMenuComponent
} from './components/left-menu/left-menu.component';
import {
  CommunityTabMenuComponent
} from './components/tab-menu/tab-menu.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  CLImageHoverDirectiveComponent
} from './components/directives/cl-image-hover.component';
import {
  communityRouting
} from './community-routing.component';

@NgModule({
  imports : [
    SharedModule,
    communityRouting
  ],
  declarations : [
    CommunityComponent,
    CommunityLeftMenuComponent,
    CommunityTabMenuComponent,
    CLImageHoverDirectiveComponent
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class CommunityModule {}

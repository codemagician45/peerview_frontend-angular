/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CreateAdComponent
} from './create-ad.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  createAdRouting
} from './create-ad-routing.component';
import {
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { CreateAdLeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { MobileCreateAdNavComponent } from './mobile-create-ad-nav/mobile-create-ad-nav.component';
import { CreateAdCampaignComponent } from './campaign/campaign.component';
import { CreateAdGroupsComponent } from './ad-groups/ad-groups.component';
import { CreateAdReviewComponent } from './review/review.component';
import { CreateAdCampaignDetailsComponent } from './campaign/tabs/details/details.component';
import { CreateAdCampaignObjectiveComponent } from './campaign/tabs/objective/objective.component';
import { CreateAdGroupsDetailsComponent } from './ad-groups/tabs/details/details.component';
import { CreateAdGroupsTargetingComponent } from './ad-groups/tabs/targeting/targeting.component';
import { CreateAdGroupsCreativesComponent } from './ad-groups/tabs/creatives/creatives.component';

@NgModule({
  imports : [
    SharedModule,
    PerfectScrollbarModule,
    MatTabsModule,
    MatCardModule,
    createAdRouting
  ],
  declarations : [
    CreateAdComponent,
    CreateAdLeftSideMenuComponent,
    MobileCreateAdNavComponent,
    CreateAdCampaignComponent,
    CreateAdGroupsComponent,
    CreateAdReviewComponent,
    CreateAdCampaignDetailsComponent,
    CreateAdCampaignObjectiveComponent,
    CreateAdGroupsDetailsComponent,
    CreateAdGroupsTargetingComponent,
    CreateAdGroupsCreativesComponent
  ],
  exports: [],
  providers: []
})
export class CreateAdModule {}

import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CreateAdComponent
} from './create-ad.component';
import {
  CreateAdCampaignComponent
} from './campaign/campaign.component';
import {
  CreateAdGroupsComponent
} from './ad-groups/ad-groups.component';
import {
  CreateAdReviewComponent
} from './review/review.component';
import { CreateAdCampaignDetailsComponent } from './campaign/tabs/details/details.component';
import { CreateAdCampaignObjectiveComponent } from './campaign/tabs/objective/objective.component';
import { CreateAdGroupsDetailsComponent } from './ad-groups/tabs/details/details.component';
import { CreateAdGroupsTargetingComponent } from './ad-groups/tabs/targeting/targeting.component';
import { CreateAdGroupsCreativesComponent } from './ad-groups/tabs/creatives/creatives.component';

const createAdRoutes: Routes = [{
  path: '',
  component: CreateAdComponent,
  children: [{
    path: '',
    redirectTo: 'campaign',
    pathMatch: 'full'
  }, {
    path: 'campaign',
    component: CreateAdCampaignComponent,
    children: [{
      path: '',
      redirectTo: 'objective',
      pathMatch: 'full'
    }, {
      path: 'objective',
      component: CreateAdCampaignObjectiveComponent
    }, {
      path: 'details',
      component: CreateAdCampaignDetailsComponent
    }]
  }, {
    path: 'ad-groups',
    component: CreateAdGroupsComponent,
    children: [{
      path: '',
      redirectTo: 'details',
      pathMatch: 'full'
    }, {
      path: 'details',
      component: CreateAdGroupsDetailsComponent
    }, {
      path: 'targeting',
      component: CreateAdGroupsTargetingComponent
    }, {
      path: 'creatives',
      component: CreateAdGroupsCreativesComponent
    }]
  }, {
    path: 'review',
    component: CreateAdReviewComponent
  }]
}];

export const createAdRouting: ModuleWithProviders = RouterModule.forChild(createAdRoutes);

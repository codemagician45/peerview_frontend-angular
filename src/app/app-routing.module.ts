import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  CanActivateUserProfile
} from './shared/can-activate';
// {
//   path: 'community',
//   loadChildren: './community/community.module#CommunityModule'
// },
export const appRoutes: Routes = [{
  path: 'support',
  loadChildren: './support/support.module#SupportModule'
}, {
  path: 'group',
  loadChildren: './group/group.module#GroupModule'
}, {
  path: 'events',
  loadChildren: './event/event.module#EventModule'
}, {
  path: 'my',
  loadChildren: './my/my.module#MyModule'
}, {
  path: 'onboard',
  loadChildren: './onboard/onboard.module#OnboardModule'
}, {
  path: 'marketplace',
  loadChildren: './marketplace/marketplace.module#MarketplaceModule'
},
//  {
//   path: 'forum',
//   loadChildren: './forum/forum.module#ForumModule'
// },
{
  path: 'deals-hub',
  loadChildren: './deals-hub/deals-hub.module#DealsHubModule',
}, {
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
}, {
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule'
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  canActivate: [CanActivateUserProfile]
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule'
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  canActivate: [CanActivateUserProfile]
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule'
}, {
  path: '',
  loadChildren: './main/main.module#MainModule'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

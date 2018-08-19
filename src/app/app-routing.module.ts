import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CanActivateUserProfile,
  RedirectToOnboardingComponent,
  RedirectToHomeComponent,
  RedirectToIndexComponent
} from './shared/can-activate';

export const appRoutes: Routes = [{
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
  data: { state: 'peers' }
}, {
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'campus'}
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  resolve: [RedirectToOnboardingComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'community'}
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'user'}
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'profile'}
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'home'
  }
}, {
  path: 'leisure',
  loadChildren: './leisure/leisure.module#LeisureModule',
  data: {state: 'leisure'}
}, {
  path: '',
  loadChildren: './index/index.module#IndexModule',
  resolve: [RedirectToOnboardingComponent, RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
}, {
  path: 'sign-up',
  loadChildren: './sign-up/sign-up.module#SignUpModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'sign-up'}
}, {
  path: 'sign-in',
  loadChildren: './sign-in/sign-in.module#SignInModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'sign-in'}
}, {
  path: 'about-us',
  loadChildren: './about-us/about-us.module#AboutUsModule',
  data: {state: 'about-us'}
}, {
  path: 'contact-us',
  loadChildren: './contact-us/contact-us.module#ContactUsModule',
  data: {state: 'contact-us'}
}, {
  path: 'digital-campus',
  loadChildren: './digital-campus/digital-campus.module#DigitalCampusModule',
  data: {state: 'digital-campus'}
}, {
  path: 'advance-search',
  loadChildren: './advance-search/advance-search.module#AdvanceSearchModule',
  data: {state: 'advance-search'}
}, {
  path: 'account-settings',
  loadChildren: './account-settings/account-settings.module#AccountSettingsModule',
  data: {state: 'account-settings'}
}, {
  path: 'terms-of-use-user',
  loadChildren: './terms-of-use-user/terms-of-use-user.module#TermsOfUseUserModule',
  data: {state: 'terms-of-use-user'}
}, {
  path: 'privacy-policy',
  loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule',
  data: {state: 'privacy-policy'}
}, {
  path: 'notification',
  loadChildren: './notification/notification.module#NotificationModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'notification'}
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

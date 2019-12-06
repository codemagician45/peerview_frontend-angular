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
  RedirectToIndexComponent,
  AuthGuard
} from './shared/can-activate';

export const appRoutes: Routes = [{
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
  data: {state: 'peers'}
}, {
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'campus'}
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  resolve: [RedirectToOnboardingComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'community'}
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'user'}
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'profile'}
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'home'
  }
}, {
  path: 'leisure',
  loadChildren: './leisure/leisure.module#LeisureModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'leisure'}
}, {
  path: 'jobs-search',
  loadChildren: './jobs-search/jobs-search.module#JobsSearchModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'jobs-search'}
}, {
  path: 'compose-job',
  loadChildren: './compose-job/compose-job.module#ComposeJobModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'compose-job'}
}, {
  path: 'job-detail',
  loadChildren: './job-detail/job-detail.module#JobDetailModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'job-detail'}
}, {
  path: '',
  loadChildren: './index/index.module#IndexModule',
  resolve: [RedirectToOnboardingComponent, RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    title: 'The Social Network for Students'
  }
}, {
  path: 'sign-up',
  loadChildren: './sign-up/sign-up.module#SignUpModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-up',
    title: 'Sign up',
  }
}, {
  path: 'sign-in',
  loadChildren: './sign-in/sign-in.module#SignInModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-in',
    title: 'Sign in',
  }
}, {
  path: 'about-us',
  loadChildren: './about-us/about-us.module#AboutUsModule',
  data: {
    state: 'about-us',
    title: 'About Peersview',
  }
}, {
  path: 'employers',
  loadChildren: './employers/employers.module#EmployersModule',
  data: {
    state: 'employers',
    title: 'Employers',
  }
}, {
  path: 'contact-us',
  loadChildren: './contact-us/contact-us.module#ContactUsModule',
  data: {
    state: 'contact-us',
    title: 'Contact Us',
  }
},
{
  path: 'support',
  loadChildren: './help-center/help-center.module#HelpCenterModule',
  data: {
    state: 'help-center',
    title: 'Help Center'
  }
}, {
  path: 'digital-campus',
  loadChildren: './digital-campus/digital-campus.module#DigitalCampusModule',
  data: {
    state: 'digital-campus',
    title: 'Peersview Digital Campus',
  }
}, {
  path: 'advance-search',
  loadChildren: './advance-search/advance-search.module#AdvanceSearchModule',
  data: {state: 'advance-search'}
}, {
  path: 'account-settings',
  loadChildren: './account-settings/account-settings.module#AccountSettingsModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'account-settings'}
}, {
  path: 'terms-of-use-user',
  loadChildren: './terms-of-use-user/terms-of-use-user.module#TermsOfUseUserModule',
  data: {
    state: 'terms-of-use-user',
    title: 'Service Terms | Peersview Digital Campus',
  }
}, {
  path: 'privacy-policy',
  loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule',
  data: {
    state: 'privacy-policy',
    title: 'Privacy policy',

  }
}, {
  path: 'notification',
  loadChildren: './notification/notification.module#NotificationModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'notification'}
}, {
  path: 'campus-admin',
  loadChildren: './campus-admin/campus-admin.module#CampusAdminModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'campus-admin'}
}, {
  path: 'terms-of-use',
  loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule',
  data: {
    state: 'terms-of-use',
    title: 'Terms of Use',
  }
}, {
  path: 'messages',
  loadChildren: './messages/messages.module#MessagesModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'messages'}
}, {
  path: 'create-ad',
  loadChildren: './create-ad/create-ad.module#CreateAdModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'create-ad',
    title: 'Create Ad'
  }
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
export class AppRoutingModule {
}

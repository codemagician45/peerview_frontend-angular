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
  data: {state: 'peers'}
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
  path: 'jobs-search-result',
  loadChildren: './jobs-search/jobs-search.module#JobsSearchModule',
  data: {state: 'jobs-search-result'}
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
    canActivate: [CanActivateUserProfile],
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
    canActivate: [CanActivateUserProfile],
    data: {state: 'messages'}
  }, {
    path: 'create-ad',
    loadChildren: './create-ad/create-ad.module#CreateAdModule',
    canActivate: [CanActivateUserProfile],
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

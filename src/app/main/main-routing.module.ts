import {
  Routes, RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  IndexComponent
} from './index/index.component';
import {
  AboutUsComponent
} from './about-us/about-us.component';
import {
  ContactComponent
} from './contact/contact.component';
import {
  CareersComponent
} from './careers/careers.component';
import {
  TermsOfUseComponent
} from './terms-of-use/terms-of-use.component';
import {
  AccountSettingsComponent
} from './account-settings/account-settings.component';
import {
  ChoosePlanComponent
} from './choose-plan/choose-plan.component';
import {
  NotificationComponent
} from './notification/notification.component';
import {
  MessagesComponent
} from './messages/messages.component';
import {
  OnBoardEmailComponent
} from './onBoard/on-Board-email.component';
import {
  ForgotPasswordComponent
} from './forgot-password/forgot-password.component';
import {
  ResetpasswordComponent
} from './reset-password/reset-password.component';
import {
  AdvancedSearchComponent
} from './advanced-search/advanced-search.component';
// import {
//   BusinessProfileComponent
// } from './business-profile/business-profile.component';
import {
  HomeComponent
} from './home/home.component';
import {
  UserProfileComponent
} from './user-profile/user-profile.component';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  CanActivateViaAuthGuard
} from '../../interceptors/canactivateviaauthguard';
import {
  BlogsComponent
} from './blogs/blogs.component';
import {
  TermsOfUseUserComponent
} from './terms-of-use-user/terms-of-use-user.component';
import {
  IndexDuplicationComponent
} from './index-duplication/index-duplication.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: IndexComponent
  // },
  {
    path: 'landing',
    component: IndexDuplicationComponent
  }, {
    path: 'about',
    component: AboutUsComponent,
    data: {
      name: 'about-us'
    }
  }, {
    path: 'about-index',
    component: AboutUsComponent,
    data: {
      name: 'about-us-index'
    }
  }, {
    path: 'contact',
    component: ContactComponent,
    data: {
      name: 'contact'
    }
  }, {
    path: 'contact-index',
    component: ContactComponent,
    data: {
      name: 'contact-index'
    }
  }, {
    path: 'careers',
    component: CareersComponent
  }, {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  }, {
    path: 'terms-of-use-user',
    component: TermsOfUseUserComponent
  }, {
    path: 'account-settings',
    component: AccountSettingsComponent
  }, {
    path: 'choose-plan',
    component: ChoosePlanComponent
  }, {
    path: 'notification',
    component: NotificationComponent
  }, {
    path: 'messages',
    component: MessagesComponent
  }, {
    path: 'onBoard',
    component: OnBoardEmailComponent
  }

  // {
  //   path: 'sign-out',
  //   component: SignOutComponent
  // }, {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // }, {
  //   path: 'reset-password/:token',
  //   component: ResetpasswordComponent,
  //   data: {
  //     name: 'resetPssword'
  //   }
  // }, {
  //   path: 'advanced-search',
  //   component: AdvancedSearchComponent
  // }, {
  //   path: 'business-profile',
  //   component: BusinessProfileComponent
  // }, {
  //   path: 'user-profile',
  //   component: UserProfileComponent
  // }, {
  //   path: 'dash',
  //   component: DashboardComponent
  // }, {
  //   path: 'blogs',
  //   component: BlogsComponent,
  //   data: {
  //     name: 'blogs'
  //   }
  // }, {
  //   path: 'blogs-index',
  //   component: BlogsComponent,
  //   data: {
  //     name: 'blogs-index'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule {}

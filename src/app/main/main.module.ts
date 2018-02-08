import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  IndexComponent
} from './index/index.component';
import {
  MainRoutingModule
} from './main-routing.module';
import {
  AboutUsComponent
} from './about-us/about-us.component';
import {
  CareersComponent
} from './careers/careers.component';
import {
  TermsOfUseComponent
} from './terms-of-use/terms-of-use.component';
import {
  ContactComponent
} from './contact/contact.component';
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
  SignUpComponent
} from './sign-up/sign-up.component';
import {
  OnBoardEmailComponent
} from './onBoard/on-Board-email.component';
import {
  VerifyUserEmailComponent
} from './verifyUserEmail/verify-user-email.component';
import {
  SignInComponent
} from './sign-in/sign-in.component';
import {
  SignSocialComponent
} from './sign-social/sign-social.component';
import {
  ForgotPasswordComponent
} from './forgot-password/forgot-password.component';
import {
  ResetpasswordComponent
} from './reset-password/reset-password.component';
import {
  SharedModule
} from '../shared/shared.module';
import {
  AdvancedSearchComponent
} from './advanced-search/advanced-search.component';
import {
  BusinessProfileComponent
} from './business-profile/business-profile.component';
import {
  HomeComponent
} from './home/home.component';
import {
  PeersListComponent
} from '../shared/peers-list/peers-list.component';
import {
  UserProfileComponent
} from './user-profile/user-profile.component';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  OwlModule
} from 'ng2-owl-carousel';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
import {
  NgbModule,
  NgbTabset,
  NgbTabsetModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  RouterModule
} from '@angular/router';
import {
  SignOutComponent
} from './sign-out/sign-out.component';
import {
  ScrollSpyModule
} from 'ngx-scrollspy';
import {
  BlogsComponent
} from './blogs/blogs.component';
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import {
  ImportModule
} from '../import.module';
import {
  TermsOfUseUserComponent
} from './terms-of-use-user/terms-of-use-user.component';
import {
  IndexDuplicationComponent
} from './index-duplication/index-duplication.component';
import {
  EqualValidator
} from '../directives/equal-validator';
import {
  ReCaptchaModule
} from 'angular2-recaptcha';
import {
  Angular2SocialLoginModule
} from 'angular2-social-login';
import {
  LoadingModule
} from 'ngx-loading';
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    OwlModule,
    MatDialogModule,
    MatDatepickerModule, MatInputModule,
    FormsModule,
    RouterModule,
    MatTooltipModule,
    NgbDropdownModule.forRoot(),
    NgbTabsetModule.forRoot(),
    ScrollSpyModule.forRoot(),
    ImportModule,
    ReCaptchaModule,
    Angular2SocialLoginModule,
    LoadingModule,
    PerfectScrollbarModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations: [
    IndexComponent, AboutUsComponent,
    CareersComponent, TermsOfUseComponent,
    ContactComponent,
    AccountSettingsComponent,
    ChoosePlanComponent,
    NotificationComponent,
    MessagesComponent,
    SignUpComponent,
    OnBoardEmailComponent,
    VerifyUserEmailComponent,
    SignInComponent,
    SignSocialComponent,
    ForgotPasswordComponent,
    ResetpasswordComponent,
    AdvancedSearchComponent,
    BusinessProfileComponent,
    HomeComponent,
    UserProfileComponent,
    DashboardComponent,
    SignOutComponent,
    BlogsComponent,
    TermsOfUseUserComponent,
    IndexDuplicationComponent,
    EqualValidator
  ]
})
export class MainModule {}

let providers = {
  'google': {
    'clientId': '957178873235-f2vj3q02hjm0d0sgntj3ttamuqr3cg2t.apps.googleusercontent.com'
  },
  'linkedin': {
    'clientId': '77y99ina3fva1b'
  },
  'facebook': {
    'clientId': '2014589065490082',
    'apiVersion': 'v2.11'
  }
};

Angular2SocialLoginModule.loadProvidersScripts(providers);

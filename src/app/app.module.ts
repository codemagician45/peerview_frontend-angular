import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
  MatDialogModule,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import {
  AccountSettingService,
  AuthenticationService,
  CampusService,
  CampusCourseService,
  CampusCourseClassService,
  CampusFreshersFeedPostService,
  CampusSocietyClubService,
  CampusStudentGroupService,
  CommunityService,
  CourseService,
  EventService,
  ForumService,
  MarketPlaceService,
  NotificationService,
  OnboardingService,
  PostService,
  UserService,
} from '../services/services';
import {
  AuthInterceptor
} from '../interceptors/authinterceptor';
import {
  CanActivateViaAuthGuard
} from '../interceptors/canactivateviaauthguard';
import {
  RouterModule
} from '@angular/router';
import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

import {
  SharedPostDetailModalComponent
} from './shared/modals';
import {
  ProfileLeftSidebarUserInfoMessageDiaglogComponent
} from './profile/left-sidebar/user-info/message/message.component';
import {
  SharedModule
} from './shared/components/shared.module';
import {
  CanActivateUserProfile
} from './shared/can-activate';

declare var tinymce: any;
tinymce.init({});

@NgModule({
  declarations: [
    AppComponent,
    SharedPostDetailModalComponent,
    // ProfileLeftSidebarUserInfoMessageDiaglogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [{
    provide: MAT_DIALOG_DATA,
    useValue: []
  }, {
    provide: DateAdapter,
    useClass: NativeDateAdapter
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: MY_DATE_FORMATS
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    CanActivateViaAuthGuard,
    AccountSettingService,
    AuthenticationService,
    CampusService,
    CampusCourseService,
    CampusCourseClassService,
    CampusFreshersFeedPostService,
    CampusSocietyClubService,
    CampusStudentGroupService,
    CommunityService,
    CourseService,
    EventService,
    ForumService,
    MarketPlaceService,
    NotificationService,
    OnboardingService,
    PostService,
    UserService,
    CanActivateUserProfile
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [
    SharedPostDetailModalComponent,
    // ProfileLeftSidebarUserInfoMessageDiaglogComponent
  ]
})
export class AppModule {}

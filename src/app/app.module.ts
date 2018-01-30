import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter, MatDialogModule
} from "@angular/material";

import { MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';

const MY_DATE_FORMATS = {
    parse: {
        dateInput: {month: "short", year: "numeric", day: "numeric"}
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: "input",
        monthYearLabel: {year: "numeric", month: "short"},
        dateA11yLabel: {year: "numeric", month: "long", day: "numeric"},
        monthYearA11yLabel: {year: "numeric", month: "long"},
    }
};

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

} from "../services/services";
import {AuthInterceptor} from "../interceptors/authinterceptor";
import {CanActivateViaAuthGuard} from "../interceptors/canactivateviaauthguard";
import {RouterModule} from "@angular/router";
import {OpenJoinComponent} from "./community/shared/modals/components/OpenJoinComponent";
import {OpenInviteComponent} from "./community/shared/modals/components/OpenInviteComponent";


import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

declare var tinymce: any;
tinymce.init({});

@NgModule({
    declarations: [
        AppComponent,
        OpenJoinComponent, OpenInviteComponent
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
    ],
    providers: [
        {provide: DateAdapter, useClass: NativeDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
        {
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
        UserService,],
    bootstrap: [AppComponent],
    exports: [],
    entryComponents: [
        OpenJoinComponent, OpenInviteComponent
    ]
})

export class AppModule {
}

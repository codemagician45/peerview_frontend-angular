import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppNavBarUnauthComponent} from "./app-navbar-unauth/app-navbar-unauth.component";
import {AppNavBarComponent} from "./app-navbar/app-navbar.component";
import {SidebarFooterComponent} from "./sidebar-footer/sidebar-footer.component";
import {SidebarImageComponent} from "./sidebar-image/sidebar-image.component";
import {SocialWidgetComponent} from "./social-widget/social-widget.component";
import {FollowersComponent} from "./followers/followers.component";
import {FollowingComponent} from "./following/following.component";
import {PeersMayKnowComponent} from "./peers-may-know/peers-may-know.component";
import {HttpClientModule} from "@angular/common/http";
import {TimeAgoPipe} from "time-ago-pipe";
import {ImportModule} from "../import.module";
import {PostDetailComponent} from "./modal/components/PostDetailComponent";
import {RouterModule} from "@angular/router";
import {NewMessageModalComponent} from './new-message-modal/new-message-modal.component';
import {NewMessageFormComponent} from './new-message-form/new-message-form.component';
import {MatDatepickerModule, MatDialogModule, MatInputModule, MatTooltipModule} from "@angular/material";
import { ShareModalComponent } from './share-modal/share-modal.component';
import {PeersListComponent} from "./peers-list/peers-list.component";
import {BrainstormingMapComponent} from "../community/shared/brainstorming-map/brainstorming-map.component";
import {ActivePollComponent} from "../community/shared/active-poll/active-poll.component";
import { FollowersFollowingComponent } from './followers-following/followers-following.component';
import {CreateClubPageComponent} from "./create-club-page/create-club-page.component";
import { AboutMeModalComponent } from './about-me-modal/about-me-modal.component';
import { PostPollMapComponent } from './post-poll-map/post-poll-map.component';
import {CommunityNavbarComponent} from "../community/shared/community-navbar/community-navbar.component";
import { PostFooterComponent } from './post-footer/post-footer.component';
//import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { FullBrainstormingMapComponent } from './full-brainstorming-map/full-brainstorming-map.component';
import { PostToComponent } from './post-to/post-to.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { UnfollowPopupComponent } from './unfollow-popup/unfollow-popup.component';
import { ReportModalComponent } from './report-modal/report-modal.component';
import { ReportModalUserComponent } from './report-modal-user/report-modal-user.component';
import {StickyWidgetDirective} from "../directives/sticky-widget.directive";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ImportModule,
        RouterModule,
        MatDialogModule,
        MatTooltipModule,
        FormsModule,
        //NgbDropdownModule.forRoot(),
    ],
    declarations: [
        SidebarImageComponent, SidebarFooterComponent,
        AppNavBarComponent,
        AppNavBarUnauthComponent,
        SocialWidgetComponent,
        FollowersComponent,
        FollowingComponent,
        PeersMayKnowComponent,
        PostDetailComponent,
        NewMessageFormComponent,
        NewMessageModalComponent,
        ShareModalComponent,
        PeersListComponent,
        FollowersFollowingComponent,
        PeersListComponent,
        BrainstormingMapComponent,
        ActivePollComponent,
        CreateClubPageComponent,
        AboutMeModalComponent,
        PostPollMapComponent,
        CommunityNavbarComponent,
        PostFooterComponent,
        FullBrainstormingMapComponent,
        PostToComponent,
        ShowImageComponent,
        UnfollowPopupComponent,
        ReportModalComponent,
        ReportModalUserComponent,
        StickyWidgetDirective,

    ],
    exports: [
        SidebarImageComponent, SidebarFooterComponent,
        AppNavBarComponent,
        AppNavBarUnauthComponent,
        SocialWidgetComponent,
        FollowersComponent,
        FollowingComponent,
        PeersMayKnowComponent,
        PostDetailComponent,
        NewMessageFormComponent,
        NewMessageModalComponent,
        ShareModalComponent,
        PeersListComponent,
        FollowersFollowingComponent,
        PeersListComponent,
        BrainstormingMapComponent,
        ActivePollComponent,
        CreateClubPageComponent,
        AboutMeModalComponent,
        PostPollMapComponent,
        CommunityNavbarComponent,
        PostFooterComponent,
        FullBrainstormingMapComponent,
        PostToComponent,
        ShowImageComponent,
        StickyWidgetDirective
    ],
    entryComponents: [
        PostDetailComponent,
        NewMessageFormComponent,
        NewMessageModalComponent,
        ShareModalComponent,
        CreateClubPageComponent,
        AboutMeModalComponent,
        PostToComponent,
        ShowImageComponent,
        UnfollowPopupComponent,
        ReportModalComponent,
        ReportModalUserComponent
    ]
})
export class SharedModule {
}

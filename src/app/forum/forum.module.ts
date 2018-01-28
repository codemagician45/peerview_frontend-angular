import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CareersComponent} from "./careers/careers.component";
import {HomeComponent} from "./home/home.component";
import {HomeReplyComponent} from "./home-reply/home-reply.component";
import {PostSecondaryComponent} from "./post-secondary/post-secondary.component";
import {PostGraduateComponent} from "./post-graduate/post-graduate.component";
import {ForumRoutingModule} from "./forum-routing.module";
import {SharedModule} from "../shared/shared.module";
import {TopQuestionsComponent} from "./top-questions/top-questions.component";
import {ImportModule} from "../import.module";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {CreateNewForumComponent} from './modal/create-new-forum/create-new-forum.component';
import {MatDialogModule} from "@angular/material";
import {BrainstormingMapComponent} from '../community/shared/brainstorming-map/brainstorming-map.component';
import { ForumItemComponent } from './forum-item/forum-item.component';
import {NgbModule, NgbTabset, NgbTabsetModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivePollComponent} from "../community/shared/active-poll/active-poll.component";
import { ForumLeftMenuComponent } from './forum-left-menu/forum-left-menu.component';


@NgModule({
    imports: [
        MatDialogModule,
        CommonModule,
        ForumRoutingModule,
        SharedModule,
        ImportModule,
        NgbCollapseModule.forRoot(),
        NgbDropdownModule.forRoot(),

    ],
    exports: [
        HomeReplyComponent,
        CreateNewForumComponent
    ],
    declarations: [
        CareersComponent,
        HomeComponent,
        HomeReplyComponent,
        PostSecondaryComponent,
        PostGraduateComponent,
        TopQuestionsComponent,
        CreateNewForumComponent,
        // BrainstormingMapComponent,
        ForumItemComponent,
        ForumLeftMenuComponent,
        // ActivePollComponent
    ],
    entryComponents: [
        CreateNewForumComponent
    ]
})
export class ForumModule {
}

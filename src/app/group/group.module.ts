import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FeedComponent} from "./feed/feed.component";
import {CreateComponent} from "./create/create.component";
import {GroupRoutingModule} from "./group-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CommunityModule} from "../community/community.module";
//import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        GroupRoutingModule,
        SharedModule,
        FormsModule,
        CommunityModule,
        //NgbDropdownModule.forRoot(),
    ],
    declarations: [FeedComponent, CreateComponent]
})
export class GroupModule {
}

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClubListComponent} from "./club-list/club-list.component";
import {EventsComponent} from "./events/events.component";
import {ProfileComponent} from "./profile/profile.component";
import {PeersListComponent} from "../shared/peers-list/peers-list.component";
import {FollowersFollowingComponent} from "../shared/followers-following/followers-following.component";

const routes: Routes = [
    {path: "club-list", component: ClubListComponent},
    {path: "events", component: EventsComponent},
    {path: "profile", component: ProfileComponent},
    {path: "followers-following", component: FollowersFollowingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MyRoutingModule {
}

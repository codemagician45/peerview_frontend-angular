import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CreateComponent} from "./create/create.component";
import {FeedComponent} from "./feed/feed.component";

const routes: Routes = [
    {path: "create", component: CreateComponent},
    {path: "feed", component: FeedComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class GroupRoutingModule {
}

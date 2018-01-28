import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CareersComponent} from "./careers/careers.component";
import {HomeComponent} from "./home/home.component";
import {HomeReplyComponent} from "./home-reply/home-reply.component";
import {PostGraduateComponent} from "./post-graduate/post-graduate.component";
import {PostSecondaryComponent} from "./post-secondary/post-secondary.component";
import {ForumItemComponent} from "./forum-item/forum-item.component";

const routes: Routes = [
    {path: "careers", component: CareersComponent},
    {path: "home", component: HomeComponent},
    {path: "home-reply", component: HomeReplyComponent},
    {path: "post-graduate", component: PostGraduateComponent},
    {path: "post-secondary", component: PostSecondaryComponent},
    {path: "forum-item", component: ForumItemComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ForumRoutingModule {
}

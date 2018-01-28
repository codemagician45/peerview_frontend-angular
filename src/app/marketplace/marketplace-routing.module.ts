import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {IndexComponent} from "./index/index.component";
import {AdsComponent} from "./ads/ads.component";
import {SellComponent} from "./sell/sell.component";

const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "ads", component: AdsComponent},
    {path: "sell", component: SellComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MarketplaceRoutingModule {
}

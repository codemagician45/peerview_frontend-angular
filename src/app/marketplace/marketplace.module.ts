import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdsComponent} from "./ads/ads.component";
import {SellComponent} from "./sell/sell.component";
import {IndexComponent} from "./index/index.component";
import {SharedModule} from "../shared/shared.module";
import {MarketplaceRoutingModule} from "./marketplace-routing.module";
import {OwlModule} from "ng2-owl-carousel";
import {CommunityModule} from "../community/community.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MarketplaceRoutingModule,
        OwlModule,
        CommunityModule,
        FormsModule
    ],
    declarations: [AdsComponent, SellComponent, IndexComponent]
})
export class MarketplaceModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClubListComponent} from './club-list/club-list.component';
import {EventsComponent} from './events/events.component';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "../shared/shared.module";
import {MyRoutingModule} from "./my-routing.module";
import {OwlModule} from "ng2-owl-carousel";
import {NgbTabsetModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { EditInterestModalComponent } from './edit-interest-modal/edit-interest-modal.component';
import { EditAccomplishmentsModalComponent } from './edit-accomplishments-modal/edit-accomplishments-modal.component';
// import { CreateClubPageComponent } from '../shared/create-club-page/create-club-page.component';
// import {PeersListComponent} from "../shared/peers-list/peers-list.component";

@NgModule({
    imports: [
        CommonModule,
        MyRoutingModule,
        SharedModule,
        OwlModule,
        NgbTabsetModule.forRoot(),
        NgbDropdownModule.forRoot(),
    ],
    declarations: [
      ClubListComponent,
      EventsComponent,
      ProfileComponent,
      EditInterestModalComponent,
      EditAccomplishmentsModalComponent,
      // CreateClubPageComponent,
      // PeersListComponent
    ],
    entryComponents: [
      EditInterestModalComponent,
      EditAccomplishmentsModalComponent,
      // CreateClubPageComponent,
    ]
})
export class MyModule {
}

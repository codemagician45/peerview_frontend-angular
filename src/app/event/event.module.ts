import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  CreateComponent
} from './create/create.component';
import {
  DetailComponent
} from './detail/detail.component';
import {
  BookTicketConfirmationComponent
} from './book-ticket-confirmation/book-ticket-confirmation.component';
import {
  HomeComponent
} from './home/home.component';
import {
  LandingComponent
} from './landing/landing.component';
import {
  SharedModule
} from '../shared/shared.module';
import {
  EventRoutingModule
} from './event-routing.module';
import {
  OwlModule
} from 'ng2-owl-carousel';
import {
  MatDialogModule,
  MatTabsModule,
  MatDatepickerModule
} from '@angular/material';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventRoutingModule,
    OwlModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [
    CreateComponent,
    DetailComponent,
    HomeComponent,
    LandingComponent,
    BookTicketConfirmationComponent
  ],
  entryComponents: [BookTicketConfirmationComponent]
})
export class EventModule {}

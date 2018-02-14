import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import {
  OwlModule
} from 'ng2-owl-carousel';
import {
  NgbTabsetModule, NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  ClubListComponent
} from './club-list/club-list.component';
import {
  EventsComponent
} from './events/events.component';
import {
  ProfileComponent
} from './profile/profile.component';
import {
  SharedModuleProxy
} from '../shared/shared.module';
import {
  MyRoutingModule
} from './my-routing.module';
import {
  EditInterestModalComponent
} from './edit-interest-modal/edit-interest-modal.component';
import {
  EditAccomplishmentsModalComponent
} from './edit-accomplishments-modal/edit-accomplishments-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MyRoutingModule,
    SharedModuleProxy,
    OwlModule,
    NgbTabsetModule.forRoot(),
    NgbDropdownModule.forRoot(),
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations: [
    ClubListComponent,
    EventsComponent,
    ProfileComponent,
    EditInterestModalComponent,
    EditAccomplishmentsModalComponent,
  ],
  entryComponents: [
    EditInterestModalComponent,
    EditAccomplishmentsModalComponent
  ]
})
export class MyModule {}

/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CampusComponent
} from './campus.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  campusRouting
} from './campus-routing.component';

@NgModule({
  imports : [
    SharedModule,
    campusRouting
  ],
  declarations : [
    CampusComponent
  ],
  exports: [],
  providers: []
})
export class CampusModule {}


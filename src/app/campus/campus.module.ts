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
import {
  CampusLeftSidebarComponent
} from './components/left-sidebar/left-sidebar.component';
import {
  CampusAllStudentsComponent
} from './all-students/all-students.component';
import {
  CampusApiService
} from '../../services/api/campus.api.service';

@NgModule({
  imports : [
    SharedModule,
    campusRouting
  ],
  declarations : [
    CampusComponent,
    CampusLeftSidebarComponent,
    CampusAllStudentsComponent
  ],
  exports: [],
  providers: [CampusApiService]
})
export class CampusModule {}


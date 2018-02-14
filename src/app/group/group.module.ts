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
  FeedComponent
} from './feed/feed.component';
import {
  CreateComponent
} from './create/create.component';
import {
  GroupRoutingModule
} from './group-routing.module';
import {
  SharedModuleProxy
} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModuleProxy,
    FormsModule
  ],
  declarations: [
    FeedComponent,
    CreateComponent
  ]
})
export class GroupModule {}

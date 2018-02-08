import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  IndexComponent
} from './index/index.component';
import {
  DealsHubRoutingModule
} from './deals-hub-routing.module';
import {
  SharedModule
} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DealsHubRoutingModule,
    SharedModule
  ],
  declarations: [IndexComponent]
})
export class DealsHubModule {}

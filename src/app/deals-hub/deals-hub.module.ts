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
  SharedModuleProxy
} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DealsHubRoutingModule,
    SharedModuleProxy
  ],
  declarations: [IndexComponent]
})
export class DealsHubModule {}

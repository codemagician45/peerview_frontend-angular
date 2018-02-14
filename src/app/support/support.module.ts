import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  SupportComponent
} from './support/support.component';
import {
  SupportRoutingModule
} from './support-routing.module';
import {
  BuisnesOrganizationComponent
} from './buisnes-organization/buisnes-organization.component';
import {
  FixProblemComponent
} from './fix-problem/fix-problem.component';
import {
  NetworkAdministratorsComponent
} from './network-administrators/network-administrators.component';
import {
  PolicesReportingComponent
} from './polices-reporting/polices-reporting.component';
import {
  UsingCommunityComponent
} from './using-community/using-community.component';
import {
  UsingPeersviewComponent
} from './using-peersview/using-peersview.component';
import {
  SupportHeaderComponent
} from './shared/support-header/support-header.component';
import {
  SharedModuleProxy
} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModuleProxy
  ],
  declarations: [
    SupportHeaderComponent,
    SupportComponent,
    BuisnesOrganizationComponent,
    FixProblemComponent,
    NetworkAdministratorsComponent,
    PolicesReportingComponent,
    UsingCommunityComponent,
    UsingPeersviewComponent
  ]
})
export class SupportModule {}

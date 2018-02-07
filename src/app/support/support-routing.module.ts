import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  SupportComponent
} from './support/support.component';
import {
  BuisnesOrganizationComponent
} from './buisnes-organization/buisnes-organization.component';
import {
  FixProblemComponent
} from './fix-problem/fix-problem.component';
import {
  PolicesReportingComponent
} from './polices-reporting/polices-reporting.component';
import {
  UsingPeersviewComponent
} from './using-peersview/using-peersview.component';
import {
  UsingCommunityComponent
} from './using-community/using-community.component';
import {
  NetworkAdministratorsComponent
} from './network-administrators/network-administrators.component';

const routes: Routes = [{
  path: '',
  component: SupportComponent,
  data: {
    name: 'support'
  }
}, {
  path:
  'support-index',
  component: SupportComponent,
  data: {
    name: 'support-index'
  }
}, {
  path: 'busy-org',
  component: BuisnesOrganizationComponent
}, {
  path: 'fix-problem',
  component: FixProblemComponent
}, {
  path: 'polices',
  component: PolicesReportingComponent
}, {
  path: 'using-peers-view',
  component: UsingPeersviewComponent
}, {
  path: 'using-online-campus',
  component: UsingCommunityComponent
}, {
  path: 'network-admin',
  component: NetworkAdministratorsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SupportRoutingModule {}

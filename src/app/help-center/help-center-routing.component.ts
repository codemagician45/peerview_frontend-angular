import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {HelpCenterComponent} from './help-center.component';
import {UsingPeersviewComponent} from './using-peersview/using-peersview.component';
import {BusinessOrganizationComponent} from './business-origanization/business-organization.component';
import {UsingOnlineCampusComponent} from './using-online-campus/using-online-campus.component';
import {PoliciesAndReportsComponent} from './policies-and-reports/policies-and-reports.component';
import {FixAProblemComponent} from './fix-a-problem/fix-a-problem.component';
import {NetworkAdministratorComponent} from './network-administrator/network-administrator.component';

const helpCenterRoutes: Routes = [
  {
    path: '',
    component: HelpCenterComponent
  },
  {
    path: 'using-peers-view',
    component: UsingPeersviewComponent
  },
  {
    path: 'fix-problem',
    component: FixAProblemComponent
  },
  {
    path: 'policies',
    component: PoliciesAndReportsComponent
  },
  {
    path: 'using-online-campus',
    component: UsingOnlineCampusComponent
  }, {
    path: 'busy-org',
    component: BusinessOrganizationComponent
  },
  {
    path: 'network-admin',
    component: NetworkAdministratorComponent
  }
];

export const helpCenterRouting: ModuleWithProviders = RouterModule.forChild(helpCenterRoutes);

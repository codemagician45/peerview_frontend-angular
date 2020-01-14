/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  helpCenterRouting
} from './help-center-routing.component';
import {
  SharedDirectiveModule
} from '../shared/directives/shared-directive.module';
import {HelpCenterComponent} from './help-center.component';
import {UsingPeersviewComponent} from './using-peersview/using-peersview.component';
import {UsingOnlineCampusComponent} from './using-online-campus/using-online-campus.component';
import {PoliciesAndReportsComponent} from './policies-and-reports/policies-and-reports.component';
import {NetworkAdministratorComponent} from './network-administrator/network-administrator.component';
import {FixAProblemComponent} from './fix-a-problem/fix-a-problem.component';
import {BusinessOrganizationComponent} from './business-origanization/business-organization.component';

/*components*/

@NgModule({
  imports: [
    SharedModule,
    SharedDirectiveModule,
    helpCenterRouting],
  declarations: [
    HelpCenterComponent,
    UsingPeersviewComponent,
    UsingOnlineCampusComponent,
    PoliciesAndReportsComponent,
    NetworkAdministratorComponent,
    FixAProblemComponent,
    BusinessOrganizationComponent
  ],
  exports: []
})
export class HelpCenterModule {
}

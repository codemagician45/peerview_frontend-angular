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

/*components*/

@NgModule({
  imports: [
    SharedModule,
    SharedDirectiveModule,
    helpCenterRouting],
  declarations: [HelpCenterComponent],
  exports: []
})
export class HelpCenterModule {
}

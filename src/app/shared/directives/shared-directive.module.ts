/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedSlideToggleDirectiveComponent
} from './slide-toggle.directive';
import {
  SharedEqualValidatorDirectiveComponent
} from './equal-validator.directive';


@NgModule({
  imports: [],
  declarations: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent
  ],
  exports: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent
  ],
  providers: []
})
export class SharedDirectiveModule {}

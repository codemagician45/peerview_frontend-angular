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
import {
  SharedStickyDirective
} from './sticky.directive';


@NgModule({
  imports: [],
  declarations: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent,
    SharedStickyDirective
  ],
  exports: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent,
    SharedStickyDirective
  ],
  providers: []
})
export class SharedDirectiveModule {}

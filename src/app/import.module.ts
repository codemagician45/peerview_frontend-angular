import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  StickyDirective
} from './directives/sticky.directive';
import {
  NguiStickyModule
} from '@ngui/sticky';

@NgModule({
  imports: [],
  declarations: [
    StickyDirective
  ],
  exports: [
    StickyDirective,
    NguiStickyModule
  ]
})
export class ImportModule {}

import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  TimeAgoPipe
} from 'time-ago-pipe';
import {
  StickyDirective
} from './directives/sticky.directive';
import {
  NguiStickyModule
} from '@ngui/sticky';

@NgModule({
  imports: [],
  declarations: [
    TimeAgoPipe,
    StickyDirective
  ],
  exports: [
    TimeAgoPipe,
    StickyDirective,
    NguiStickyModule
  ]
})
export class ImportModule {}

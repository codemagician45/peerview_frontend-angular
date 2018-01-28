import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TimeAgoPipe} from "time-ago-pipe";
import {StickyDirective} from "./directives/sticky.directive";
import { NguiStickyModule } from '@ngui/sticky';

// This component should strictly be for importing items that need to be present in multiple modules

@NgModule({
    imports: [
      // NguiStickyModule
    ],
    declarations: [
      TimeAgoPipe,
      StickyDirective,

    ],
    exports: [
      TimeAgoPipe,
      StickyDirective,
      NguiStickyModule
  ],

})

export class ImportModule {
}

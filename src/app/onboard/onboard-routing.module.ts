import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  OneComponent
} from './one/one.component';
import {
  TwoComponent
} from './two/two.component';
import {
  TwoExComponent
} from './two-ex/two-ex.component';
import {
  TwoOptComponent
} from './two-opt/two-opt.component';
import {
  TwoOrgComponent
} from './two-org/two-org.component';
import {
  ThreeComponent
} from './three/three.component';
import {
  StepComponent
} from './step/step.component';
import {
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

const routes: Routes = [{
  path: ':variation',
  component: StepComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatDatepickerModule
  ],
  exports: [RouterModule],
  providers: []
})
export class OnboardRoutingModule {}

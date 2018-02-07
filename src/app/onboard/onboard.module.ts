import {
  ThreeComponent
} from './three/three.component';
import {
  TwoOrgComponent
} from './two-org/two-org.component';
import {
  TwoOptComponent
} from './two-opt/two-opt.component';
import {
  TwoExComponent
} from './two-ex/two-ex.component';
import {
  TwoComponent
} from './two/two.component';
import {
  OneComponent
} from './one/one.component';
import {
  StepComponent
} from './step/step.component';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  OnboardRoutingModule
} from './onboard-routing.module';
import {
  FormsModule
} from '@angular/forms';
import {
  SelectedInterestPipe
} from '../../interceptors/selectedinterestpipe';
import {
  MatDatepickerModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule, MatInputModule,
    OnboardRoutingModule,
    FormsModule
  ],
  declarations: [
    OneComponent,
    SelectedInterestPipe,
    TwoComponent,
    TwoExComponent,
    TwoOptComponent,
    TwoOrgComponent,
    ThreeComponent,
    StepComponent
  ]
})
export class OnboardModule {}

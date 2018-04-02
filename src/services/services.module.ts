import {
  NgModule
} from '@angular/core';
import {
  InterestService
} from './interest.service';
import {
  UtilitiesService
} from './utilities.service';

@NgModule({
  providers: [
    InterestService,
    UtilitiesService
  ]
})
export class ServicesModule {}

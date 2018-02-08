import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  CreateComponent
} from './create/create.component';
import {
  HomeComponent
} from './home/home.component';
import {
  DetailComponent
} from './detail/detail.component';
import {
  LandingComponent
} from './landing/landing.component';

const routes: Routes = [{
  path: 'create',
  component: CreateComponent
}, {
  path: 'home', component: HomeComponent
}, {
  path: 'detail/:id',
  component: DetailComponent
}, {
  path: 'landing',
  component: LandingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EventRoutingModule {}

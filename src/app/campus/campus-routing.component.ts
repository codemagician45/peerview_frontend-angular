import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CampusComponent
} from './campus.component';
import {
  CampusLandingPageComponent
} from './landing-page/landing-page.component';
import {
  CampusAllStudentsComponent
} from './main/all-students/all-students.component';
import {
  CampusMainComponent
} from './main/main.component';
import {
  CampusFreshersFeedComponent
} from './main/freshers-feed/freshers-feed.component';
import {
  CampusFreshersFeedLandingComponent
} from './main/freshers-feed/landing/freshers-feed-landing.component';
import {
  CampusFreshersFeedMainComponent
} from './main/freshers-feed/main/freshers-feed-main.component';

const campusRoutes: Routes = [{
  path: '',
  component: CampusComponent,
  children: [{
    path: '',
    component: CampusLandingPageComponent
  }, {
    path: ':id',
    component: CampusMainComponent,
    children: [{
      path: 'all-students',
      component: CampusAllStudentsComponent
    }, {
      path: 'freshers-feed',
      component: CampusFreshersFeedComponent,
      children: [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }, {
        path: 'landing',
        component: CampusFreshersFeedLandingComponent
      }, {
        path: ':id',
        component: CampusFreshersFeedMainComponent
      }]
    }]
  }]
}];

export const campusRouting: ModuleWithProviders = RouterModule.forChild(campusRoutes);

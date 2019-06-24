import {
  ModuleWithProviders
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';
import {DigitalCampusComponent} from './digital-campus.component';
import {DigitalCampusStudentsComponent} from './components/students/students.component';
import {DigitalCampusNetworkAdministratorsComponent} from './components/network-administrators/network-administrators.component';
import {DigitalCampusInstititutionsComponent} from './components/institutions/institutions.component';
import {DigitalCampusFaqComponent} from './components/faq/faq.component';


const digitalCampusRoutes: Routes = [{
  path: '',
  component: DigitalCampusComponent
},
  {
    path: 'students',
    component: DigitalCampusStudentsComponent
  },
  {
    path: 'network-administrators',
    component: DigitalCampusNetworkAdministratorsComponent
  },
  {
    path: 'institutions',
    component: DigitalCampusInstititutionsComponent
  },
  {
    path: 'faqs',
    component: DigitalCampusFaqComponent
  }
];

export const digitalCampusRouting: ModuleWithProviders = RouterModule.forChild(digitalCampusRoutes);

import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  UserComponent
} from './user.component';
import {
  UserVerifyEmailComponent
} from './verify-email/verify-email.component';
import {
  UserOnboardingComponent
} from './on-boarding/on-boarding.component';
import {
  UserOnboardingSelectStatusComponent
} from './on-boarding/select-status/select-status.component';
import {
  UserOnboardingStudentComponent
} from './on-boarding/student/student.component';
import {
  UserOnboardingStudentInterestComponent
} from './on-boarding/student/interest/interest.component';
import {
  UserOnboardingProfessionalComponent
} from './on-boarding/professional/professional.component';
import {
  UserOnboardingOrganisationComponent
} from './on-boarding/organisation/organisation.component';

const userRoutes: Routes = [{
  path: '',
  component: UserComponent
}, {
  path: 'verify-email',
  component: UserVerifyEmailComponent
}, {
  path: 'on-boarding',
  component: UserOnboardingComponent,
  children: [{
    path: 'status',
    component: UserOnboardingSelectStatusComponent,
    data: {
      step: ['active', 'next', 'next']
    }
  }, {
    path: 'status/organisation',
    component: UserOnboardingOrganisationComponent,
    data: {
      step: ['complete', 'active', 'next']
    }
  }, {
    path: 'status/organisation/interest',
    component: UserOnboardingStudentInterestComponent,
    data: {
      step: ['complete', 'complete', 'active']
    }
  }, {
    path: 'status/professional',
    component: UserOnboardingProfessionalComponent,
    data: {
      step: ['complete', 'active', 'next']
    }
  }, {
    path: 'status/student',
    component: UserOnboardingStudentComponent,
    data: {
      step: ['complete', 'active', 'next']
    }
  }, {
    path: 'status/student/interest',
    component: UserOnboardingStudentInterestComponent,
    data: {
      step: ['complete', 'complete', 'active']
    },
  }]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

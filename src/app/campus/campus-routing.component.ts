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
import {
  CampusCourseFeedComponent
} from './main/course-feed/course-feed.component';
import {
  CampusCourseFeedLandingComponent
} from './main/course-feed/landing/course-feed-landing.component';
import {
  CampusCourseFeedMainComponent
} from './main/course-feed/main/course-feed-main.component';
import {
  CampusClassesComponent
} from './main/classes/classes.component';
import {
  CampusClassesLandingComponent
} from './main/classes/landing/classes-landing.component';
import {
  CampusClassesMainComponent
} from './main/classes/main/classes-main.component';
import {
  CampusStudentGroupComponent
} from './main/student-group/student-group.component';
import {
  CampusStudentGroupLandingComponent
} from './main/student-group/landing/student-group-landing.component';
import {
  CampusStudentGroupCreateGroupComponent
} from './main/student-group/create-group/student-group-create-group.component';
import {
  CampusMarketplaceComponent
} from './main/marketplace/marketplace.component';
import {
  CampusMarketplaceLandingComponent
} from './main/marketplace/landing/marketplace-landing.component';
import {
  CampusMarketplaceItemToSellComponent
} from './main/marketplace/item-to-sell/marketplace-item-to-sell.component';
import {
  CampusMarketPlaceItemDetails
} from './main/marketplace/item-details/marketplace-item-details.component';
import {
  CampusMentoringComponent
} from './main/mentoring/mentoring.component';
import {
  ClassPostComponent
} from './main/class-posts/class-posts.component';
import { CampusVerifyEmailComponent } from './verify-email/verify-email.component';
import { RedirectToMainCampus } from './redirect-to-main';
import { RedirectToLandingCampus } from './redirect-to-landing';

const campusRoutes: Routes = [{
  path: '',
  component: CampusComponent,
  children: [{
    path: '',
    component: CampusLandingPageComponent,
    resolve: [RedirectToMainCampus],
  }, {
    path: 'verify-email',
    component: CampusVerifyEmailComponent,
    resolve: [RedirectToMainCampus],
  }, {
    path: ':id',
    component: CampusMainComponent,
    resolve: [RedirectToLandingCampus],
    children: [{
      path: 'class-posts',
      component: ClassPostComponent,
    }, {
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
    }, {
      path: 'course-feed',
      component: CampusCourseFeedComponent,
      children: [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }, {
        path: 'landing',
        component: CampusCourseFeedLandingComponent
      }, {
        path: ':id',
        component: CampusCourseFeedMainComponent
      }]
    }, {
      path: 'classes',
      component: CampusClassesComponent,
      children: [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }, {
        path: 'landing',
        component: CampusClassesLandingComponent
      }, {
        path: ':id',
        component: CampusClassesMainComponent
      }]
    }, {
      path: 'student-group',
      component: CampusStudentGroupComponent,
      children: [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }, {
        path: 'landing',
        component: CampusStudentGroupLandingComponent
      }, {
        path: 'create',
        component: CampusStudentGroupCreateGroupComponent
      }]
    }, {
      path: 'marketplace',
      component: CampusMarketplaceComponent,
      children: [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      }, {
        path: 'landing',
        component: CampusMarketplaceLandingComponent
      }, {
        path: 'item-to-sell',
        component: CampusMarketplaceItemToSellComponent
      }, {
        path: ':id',
        component: CampusMarketPlaceItemDetails
      }]
    }, {
      path: 'mentoring',
      component: CampusMentoringComponent
    }]
  }]
}];

export const campusRouting: ModuleWithProviders = RouterModule.forChild(campusRoutes);

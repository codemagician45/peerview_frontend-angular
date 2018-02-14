import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  CareersComponent
} from './careers/careers.component';
import {
  HomeComponent
} from './home/home.component';
import {
  HomeReplyComponent
} from './home-reply/home-reply.component';
import {
  PostSecondaryComponent
} from './post-secondary/post-secondary.component';
import {
  PostGraduateComponent
} from './post-graduate/post-graduate.component';
import {
  ForumRoutingModule
} from './forum-routing.module';
import {
  SharedModuleProxy
} from '../shared/shared.module';
import {
  TopQuestionsComponent } from './top-questions/top-questions.component';
import {
  ImportModule
} from '../import.module';
import {
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  CreateNewForumComponent
} from './modal/create-new-forum/create-new-forum.component';
import {
  MatDialogModule
} from '@angular/material';
import {
  ForumItemComponent
} from './forum-item/forum-item.component';
import {
  NgbModule,
  NgbTabset,
  NgbTabsetModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  ForumLeftMenuComponent
} from './forum-left-menu/forum-left-menu.component';

@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    ForumRoutingModule,
    SharedModuleProxy,
    ImportModule,
    NgbCollapseModule.forRoot(),
    NgbDropdownModule.forRoot()
  ],
  exports: [
    HomeReplyComponent,
    CreateNewForumComponent
  ],
  declarations: [
    CareersComponent,
    HomeComponent,
    HomeReplyComponent,
    PostSecondaryComponent,
    PostGraduateComponent,
    TopQuestionsComponent,
    CreateNewForumComponent,
    ForumItemComponent,
    ForumLeftMenuComponent
  ],
  entryComponents: [
    CreateNewForumComponent
  ]
})
export class ForumModule {}

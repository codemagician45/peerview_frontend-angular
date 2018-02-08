import { Component, OnInit } from '@angular/core';
import { PostDetailComponent } from '../../shared/modal/components/PostDetailComponent';
import { MatDialog } from '@angular/material';
import { CampusService } from '../../../services/services';

@Component({
  selector: 'app-courses-feed',
  templateUrl: './courses-feed.component.html',
  styleUrls: ['./courses-feed.component.scss']
})
export class CoursesFeedComponent implements OnInit {
  constructor (
    private dialog: MatDialog,
    private postservice: CampusService
  ) {}

  protected freshersfeedposts = [];

  public ngOnInit (): void {
    this.postservice.getfreshersfeedpost()
    .subscribe((response: any) => {
      this.freshersfeedposts = response.campusPosts;
    });

    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }
  }

  protected postLink (e): void {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected pollLink (e): void {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected openPostDetail (): void {
    this.dialog.open(PostDetailComponent);
  }
}

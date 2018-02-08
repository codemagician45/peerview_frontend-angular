import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  MatDialog
} from '@angular/material';
import {
  CreateNewForumComponent
} from '../modal/create-new-forum/create-new-forum.component';

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent implements OnInit {
  constructor (
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  public peers: any;

  public ngOnInit (): void {
    const that = this;
    this.http.get('https://randomuser.me/api/?results=15').subscribe(data => {
      that.peers = data['results'];
      that.peers.map(function (item, index): void {
        if (index >= 10) {
          item.hidden = 1;
        }
      });
    });
  }

  public visibilityToggle (): void {
    this.peers.map(function (item, index): void {
      if (index >= 10) {
        item.hidden = !item.hidden;
      }
    });
  }

  public postLink (e): void {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  public brainLink (e): void {
    $('.create-post, .create-poll, .timeline-block, .ask-question').hide();
    $('.brain-map').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  public pollLink (e): void {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  public addNewForum (): void {
    this.dialog.open(CreateNewForumComponent);
  }
}

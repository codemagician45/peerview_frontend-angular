import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  PostDetailComponent
} from '../modal/components/PostDetailComponent';
import {
  ShareModalComponent
} from '../share-modal/share-modal.component';
import {
  ReportModalComponent
} from '../report-modal/report-modal.component';
import {
  UserService,
  PostService
} from '../../../services/services';
import {
  LikePost
} from '../../../models/models';
import * as Ps from 'perfect-scrollbar';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  constructor (
    public dialog: MatDialog,
    private _userservice: UserService,
    private _postservice: PostService
  ) {}

  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected post: any;
  @Input('reply-link') private replyLink = '';
  public user: any;

  public ngOnInit (): void {
    this.user = this._userservice.getLoggedInUser();
    this.post = this.post || {};
  }

  protected openPostDetail (): void {
    if (this.replyLink) {
      return;
    }

    this.dialog.open(PostDetailComponent);
    setTimeout(() => {
      const container = $('.mat-dialog-container')[0];
    }, 200);
  }

  protected openShare (): void {
    this.dialog.open(ShareModalComponent);
  }

  protected report (): void {
    this.dialog.open(ReportModalComponent);
  }

  protected likepost (): void {
    this._postservice.likepost(this.post.id, new LikePost()).subscribe(resp => {
      if (resp['error'] === false) {
        alert(resp['Message']);
      }
    }, error => {
      console.error('Error Liking Post');
      console.error(error);
    });
  }
}

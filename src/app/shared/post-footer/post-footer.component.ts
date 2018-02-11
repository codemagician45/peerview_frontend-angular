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
    private userservice: UserService,
    private postservice: PostService
  ) {}

  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected post: any;
  @Input() protected ratingCount: number = 0;
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  public user: any;

  public ngOnInit (): void {
    this.user = this.userservice.getLoggedInUser();
    this.post = this.post || {};
  }

  public ngAfterViewInit (): void {
    this.starsToBeAdded();
  }

  protected onOpenPostDetailDialogComponent (): void {
    this.dialog.open(PostDetailComponent);
  }

  protected openShare (): void {
    this.dialog.open(ShareModalComponent);
  }

  protected report (): void {
    this.dialog.open(ReportModalComponent);
  }

  protected likepost (): void {
    this.postservice.likepost(this.post.id, new LikePost()).subscribe(resp => {
      if (resp['error'] === false) {
        alert(resp['Message']);
      }
    }, error => {
      console.error('Error Liking Post');
      console.error(error);
    });
  }

  /**
   * This would be added as an array
   * for the stars in the like of the
   * Post
   */
  private starsToBeAdded (): void {
    let roundOf = Math.round(this.ratingCount);

    Array.from({length: roundOf}, () => {
      this.stars.push('star');
    });

    if (roundOf > this.ratingCount) {
      this.stars.push('star_half');
    }

    let remainingStars = 5 - this.stars.length;

    Array.from({length: remainingStars}, () => {
      this.stars.push('star_border');
    });
  }
}

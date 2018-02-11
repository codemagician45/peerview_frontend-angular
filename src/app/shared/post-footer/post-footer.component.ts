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
  LikePost,
  Post
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
  @Input() protected post: Post;
  @Input() protected ratingCount: number = 0;
  @Input() protected disableRepliesLink: boolean;
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  public user: any;

  public ngOnInit (): void {
    this.user = this.userservice.getLoggedInUser();
  }

  protected onOpenPostDetailDialogComponent (): void {
    /**
     * Because we do have reusable component
     * We will be having infinite onOpenPostDetailDialogComponent
     * for this one to be disble we have to check if
     * disableRepliesLink = true which is set inside
     * under PostDetailComponent
     */
    !this.disableRepliesLink && this.dialog.open(PostDetailComponent, {
      data: this.post
    });
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
}

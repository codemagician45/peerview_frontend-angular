import {
  Component,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  SharedPostDetailModalComponent,
  SharePostModalComponent,
  SharedViewPostModalComponent
} from '../../modals';
import {
  UserService,
  PostService
} from '../../../../services/services';
import {
  PostModel,
  LikePost,
  ReplyPost,
  PostReply,
  UserModel,
} from '../../models';
import {
  UserClass
} from '../../classes';
import {
  EmitterService
} from '../../emitter/emitter.component';

@Component({
  selector: 'shared-post-options-component',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss']
})
export class SharedPostOptionsComponent {
  constructor (
    public dialog: MatDialog,
    private postService: PostService
  ) {}
  private sharePostSuccessEmitter = EmitterService.get('sharePostEmitter');
  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected isShareable: boolean = false;
  @Input() protected post: PostModel;
  @Input() protected ratingCount: number = 0;
  @Input() protected disableRepliesLink: boolean;
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  public user: UserModel = UserClass.getUser();
  protected isLikingOrUnlikingPost = false;
  protected reply: ReplyPost = new ReplyPost();
  protected hideReplySection = true;
  protected commentSubmitting = false;
  protected postReply = [];
  public ngOnInit (): void {}

  protected onOpenSharedPostDetailModalComponent (): void {
    /**
     * Because we do have reusable component
     * We will be having infinite onOpenPostDetailDialogComponent
     * for this one to be disble we have to check if
     * disableRepliesLink = true which is set inside
     * under PostDetailComponent
     */
    !this.disableRepliesLink && this.dialog.open(SharedPostDetailModalComponent, {
      data: this.post
    });
  }

  protected openReplyContainer (): void {
    this.hideReplySection = !this.hideReplySection;
  }

  protected openShare (): void {
    this.dialog.open(SharePostModalComponent, {
      data: this.post,
      id: 'SharePostModalComponent'
    })
    .afterClosed()
    .subscribe(data => {
      if (data) {
        this.sharePostSuccessEmitter.emit(data);
      }
    }, error => {
      console.log(error);
    });
  }

  protected likepost (): void {
    this.isLikingOrUnlikingPost = true;
    if (this.post.isUserPostLike > 0) {
      this.postService.unlikepost(this.post.id, new LikePost())
      .subscribe(response => {
        this.post.isUserPostLike = 0;
        this.post.likeCount -= 1;
        this.isLikingOrUnlikingPost = false;

      }, error => {
        console.error('Error Liking Post');
        console.error(error);
        this.isLikingOrUnlikingPost = false;
      });
    } else {
      this.postService.likepost(this.post.id, new LikePost())
      .subscribe(response => {
        this.post.isUserPostLike = 1;
        this.post.likeCount += 1;
        this.isLikingOrUnlikingPost = false;
      }, error => {
        this.isLikingOrUnlikingPost = false;
        console.error('Error Liking Post');
        console.error(error);
      });
    }
  }

  protected submitPostReply (): void {
    this.commentSubmitting = true;
    let currentDateAndTime = new Date();
    let replyPostUser = new PostReply();
    this.postService.replypost(this.post.id, this.reply)
    .subscribe(response => {
      replyPostUser.user = this.user;
      replyPostUser.comment = this.reply.comment;
      replyPostUser.createdAt = currentDateAndTime;

      this.post.postReply.unshift(replyPostUser);
      this.reply.comment = '';
      this.commentSubmitting = false;
    }, error => {
      console.log(error);
    });
  }

  protected  openViewModal (): void {
    this.dialog.open(SharedViewPostModalComponent, {
      data: this.post,
      id: 'SharedViewPostModalComponent'
    });
  }
}

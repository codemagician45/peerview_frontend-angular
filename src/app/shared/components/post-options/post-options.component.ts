import {
  Component,
  Input
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  SharedPostDetailModalComponent,
  SharedSharePostModalComponent,
  SharedViewPostModalComponent,
  SharedPostCommentDetailModalComponent
} from '../../modals';
import {
  PostApiService
} from '../../../../services/api';
import {
  PostModel,
  PostReplyModel,
  UserModel,
  IResponse
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
    private postApiService: PostApiService,
    private overlay: Overlay
  ) {}

  public user: UserModel = UserClass.getUser();
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
  protected isLikingOrUnlikingPost = false;
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  protected hideReplySection = true;
  private sharePostSuccessEmitter = EmitterService.get('sharePostEmitter');


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

  protected onOpenShareModal (): void {
    /* Added MatDialogConfig for adding a custom setting for this modal */
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'share-post-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = this.post;
    dialogConfig.id = 'SharePostModalComponent';
    this.dialog.open(SharedSharePostModalComponent, dialogConfig)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.sharePostSuccessEmitter.emit(data);
        }
      }, error => {
        console.log(error);
      });
  }

  protected onClickPostLike (isUserPostLike: boolean): void {
    let service: any;
    switch (this.route.name) {
      case 'home':
        service = 'postApiService';
        break;
      case 'campus':
        service = 'campusApiService';
        break;
    }

    if (this.post.isUserPostLike !== 0) {
      this[service].promiseRemovePostLike(this.post.id)
        .then((response: IResponse) => {
          this.post.isUserPostLike = 0;
          this.post.likeCount -= 1;
        })
        .catch(error => {});
    } else {
      this[service].promiseCreatePostLike(this.post.id)
        .then((response: IResponse) => {
          this.post.isUserPostLike = 1;
          this.post.likeCount += 1;
        })
        .catch(error => {});
    }
  }

  protected onPostReply (): void {
    this.isUserCurrentlyCommenting = true;
    this.postApiService.promiseCreatePostReply(this.post.id, this.postReply)
      .then((response: IResponse) => {
        this.postReply.user = this.user;
        this.postReply.createdAt = new Date();
        // clone the postReply
        let postReply: any = this.postReply.clone();
        this.post.postReply.unshift(postReply);
        this.postReply.init(); // this will initialize the data with blank ones
        this.isUserCurrentlyCommenting = false;
      })
      .catch(error => {

      });
  }

  protected openViewModal (): void {
    this.dialog.open(SharedViewPostModalComponent, {
      data: this.post,
      id: 'SharedViewPostModalComponent'
    });
  }

  protected onClickCommentDetail (): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-comment-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    // dialogConfig.data = this.post;
    this.dialog.open(SharedPostCommentDetailModalComponent, dialogConfig);
  }
}

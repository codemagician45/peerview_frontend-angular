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
  SharedSharePostModalComponent,
  SharedViewPostModalComponent,
  SharedPostDetailModalComponent,
  SharedPostLikeDetailModalComponent
} from '../../modals';
import {
  PostApiService,
  CampusApiService
} from '../../../../services/api';
import {
  PostModel,
  CampusPostModel,
  PostReplyModel,
  CampusPostReplyModel,
  UserModel,
  IResponse
} from '../../models';
import {
  PostEmitter
} from '../../emitter';

@Component({
  selector: 'shared-post-options-component',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss']
})
export class SharedPostOptionsComponent {
  constructor (
    private postApiService: PostApiService,
    private campusApiService: CampusApiService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected isShareable: boolean = false;
  @Input() protected post: PostModel|CampusPostModel;
  @Input() protected ratingCount: number = 0;
  @Input() protected disableRepliesLink: boolean;
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number};
  @Input() protected user: UserModel;
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  protected isLikingOrUnlikingPost = false;
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  protected campusPostReply: CampusPostReplyModel = new CampusPostReplyModel();
  protected hideReplySection = true;

  public ngOnInit (): void {}

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
      .subscribe((post: PostModel|CampusPostModel) => {
        if (post) {
          PostEmitter.postShare().emit(post);
        }
      }, error => {
        console.log(error);
      });
  }

  protected onLikesLabelClick (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-like-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {post: this.post, user: this.user};
    this.dialog.open(SharedPostLikeDetailModalComponent, dialogConfig);
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
    dialogConfig.data = {post: this.post, route: this.route, user: this.user};
    this.dialog.open(SharedPostDetailModalComponent, dialogConfig);
  }
}

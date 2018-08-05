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
  SharedViewPostModalComponent
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
  UserClass
} from '../../classes';
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

  public user: UserModel = UserClass.getUser();
  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected isShareable: boolean = false;
  @Input() protected post: PostModel|CampusPostModel;
  @Input() protected ratingCount: number = 0;
  @Input() protected disableRepliesLink: boolean;
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number};
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  protected isLikingOrUnlikingPost = false;
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  protected campusPostReply: CampusPostReplyModel = new CampusPostReplyModel();
  protected hideReplySection = true;

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
      .subscribe((post: PostModel|CampusPostModel) => {
        if (post) {
          PostEmitter.postShare().emit(post);
        }
      }, error => {
        console.log(error);
      });
  }

  protected onClickPostLike (isUserPostLike: boolean): void {
    this.isLikingOrUnlikingPost = true;
    if (this.post.isUserPostLike) {
      this.postApiService.promiseRemovePostLike(this.post.id)
        .then((response: IResponse) => {
          this.post.isUserPostLike = 0;
          this.post.likeCount -= 1;
          this.isLikingOrUnlikingPost = false;
        })
        .catch(error => {
          this.isLikingOrUnlikingPost = false;
        });
    } else {
      this.postApiService.promiseCreatePostLike(this.post.id)
        .then((response: IResponse) => {
          this.post.isUserPostLike = 1;
          this.post.likeCount += 1;
          this.isLikingOrUnlikingPost = false;
        })
        .catch(error => {
          this.isLikingOrUnlikingPost = false;
        });
    }
  }

  protected onPostReply (): void {
    this.isUserCurrentlyCommenting = true;

    switch (this.route.name) {
      case 'home':
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
        break;
      case 'campus':
      case 'campusFreshersFeed':
        this.campusPostReply.assimilate({comment: this.postReply.comment});
        this.campusApiService.promiseCreatePostReply(this.post.id, this.campusPostReply)
          .then((response: IResponse) => {
            this.campusPostReply.user = this.user;
            this.campusPostReply.createdAt = new Date();
            let campusPostReply: any = this.campusPostReply.clone();
            this.post.postReply.unshift(campusPostReply);
            this.postReply.init();
            this.isUserCurrentlyCommenting = false;
          })
          .catch(error => {});
        break;
    }
  }

  protected openViewModal (): void {
    this.dialog.open(SharedViewPostModalComponent, {
      data: this.post,
      id: 'SharedViewPostModalComponent'
    });
  }
}

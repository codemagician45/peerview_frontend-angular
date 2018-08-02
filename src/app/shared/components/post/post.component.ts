import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  PostModel,
  IResponse
} from '../../models';
import {
  PostApiService,
} from '../../../../services/api';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserClass
} from '../../classes/user';
import {
  SharedImagePreviewComponent
} from '../../modals/image-preview/image-preview.component';

@Component({
  selector: 'shared-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class SharedPostComponent {
  constructor (
    private postApiService: PostApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected posts: Array<PostModel> = [];
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private sharePostSuccessSubscriber = EmitterService.get('sharePostEmitter');
  private postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private hasAddedPostCounter = 0;
  private counter = 0;
  private limit = 5;
  private offset = 10;
  private isDisabled = false;
  private user = UserClass.getUser();
  protected btnLoadMoreText = 'Load More';

  public ngOnInit (): void {
    this.getSharedPostSubscriber();
    this.postSavedSubcribers();
  }

  private postSavedSubcribers (): void {
    PostEmitter
    .postSave()
    .subscribe(postId => {
      this.postApiService.promiseGetPost(postId)
        .then((post: PostModel) => {
          this.posts.unshift(post);
          this.hasAddedPostCounter += 1;
        })
        .catch(() => {});
    });
  }

  private getSharedPostSubscriber (): void {
    this.sharePostSuccessSubscriber
    .subscribe(data => {
      this.postApiService.promiseGetPost(data.postId)
        .then((post: PostModel) => {
          this.posts.unshift(post);
          this.hasAddedPostCounter += 1;
        })
        .catch(() => {});
    });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    if (user.id === this.user.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.postApiService.promiseRemovePost(postId)
      .then((response: IResponse) => {
        let index = this.posts.findIndex(filter => filter.id === postId);
        this.posts.splice(index, 1);
      })
      .catch(() => {});
  }

  protected onLoadMorePost (): void {
    /*Disable post button after submit to prevent post duplication*/
    this.isDisabled = true;
    this.counter = this.hasAddedPostCounter;
    this.offset = this.offset + this.counter;

    this.postApiService.promiseGetAllPost(this.limit, this.offset)
    .then((posts: PostModel[]) => {
      this.offset = 5 + this.offset;
      this.limit = 5;
      this.posts = this.posts.concat(posts);
      this.hasAddedPostCounter = 0;

      if (posts.length > 0) {
        this.isDisabled = false;
      } else {
        this.btnLoadMoreText = 'No More Posts To Show';
      }
    });
  }

  protected onClickPhoto (postAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: postAttachments, clickIndex: imageIndex };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}

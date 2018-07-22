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
  PostModel,
  PostResponse,
  PostsResponse,
  Response
} from '../../models';
import {
  PostService,
} from '../../../../services';
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
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Input() protected posts: Array<PostModel>;
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private sharePostSuccessSubscriber = EmitterService.get('sharePostEmitter');
  private postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private hasAddedPostCounter = 0;
  private counter = 0;
  private limit = 5;
  private offset = 10;
  private cryptoUtilities = new CryptoUtilities();
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
    .subscribe(response => {
      this.postService.getPost(response)
      .subscribe((data: PostResponse) => {
        this.posts.unshift(data.post);
        this.hasAddedPostCounter += 1;
      });
    });
  }

  private getSharedPostSubscriber (): void {
    this.sharePostSuccessSubscriber
    .subscribe(data => {
      this.postService.getPost(data.postId)
      .subscribe((response: PostResponse) => {
        this.posts.unshift(response.post);
        this.hasAddedPostCounter += 1;
      }, error => {
        console.log(error);
      });
    });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = this.cryptoUtilities.cipher(user.id);
    if (user.id === this.user.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.postService.deleteOne(postId)
    .subscribe((response: Response) => {
      let index = this.posts.findIndex(filter => filter.id === postId);
      this.posts.splice(index, 1);
    });
  }

  protected onLoadMorePost (): void {
    /*Disable post button after submit to prevent post duplication*/
    this.isDisabled = true;
    this.counter = this.hasAddedPostCounter;
    this.offset = this.offset + this.counter;

    this.postService.getPosts(this.limit, this.offset)
    .subscribe((response: PostsResponse) => {
      this.offset = 5 + this.offset;
      this.limit = 5;
      this.posts = this.posts.concat(response.posts);
      this.hasAddedPostCounter = 0;
      if (response.posts.length > 0) {
        this.isDisabled = false;
      } else {
        this.btnLoadMoreText = 'No More Posts To Show';
      }
    });
  }

  protected onClickPhoto (postAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.data = { images: postAttachments, clickIndex: imageIndex };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}

import {
  Component,
  Input,
  EventEmitter
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
  CampusPostModel,
  IResponse
} from '../../models';
import {
  PostApiService,
  CampusApiService
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
    private campusApiService: CampusApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected posts: Array<any> = [];
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number} = {name: 'home'};
  protected btnLoadMoreText = 'Load More';
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;
  private user = UserClass.getUser();

  public ngOnInit (): void {
    this.getSharedPostSubscriber();
    this.postSavedSubcribers();
  }

  private postSavedSubcribers (): void {
    PostEmitter.postSave()
      .subscribe((post: PostModel|CampusPostModel) => {
        this.posts.unshift(post);
      });
  }

  private getSharedPostSubscriber (): void {
    PostEmitter.postShare()
      .subscribe((post: PostModel|CampusPostModel) => {
        this.posts.unshift(post);
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
    this.offset = this.posts.length;

    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseGetAllPost(this.limit, this.offset)
          .then((posts: PostModel[]) => {
            this.posts = this.posts.concat(posts);
            this.checkIfThereAreStillPostAvailable(posts);
          });
        break;
      case 'campus':
        let campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseGetAllPost(campusId, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
          });
        break;
    }
  }

  protected onClickPhoto (postAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: postAttachments, clickIndex: imageIndex, source: 'post' };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  protected getPollExpiryDuration (createdDate, duration): any {
    let date = new Date(createdDate);
    let expiryDate = date.setDate(date.getDate() + duration);
    let dateNow: any = new Date();

    let seconds = Math.floor((expiryDate - (dateNow)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    minutes = minutes - (days * 24 * 60) - ((hours - (days * 24)) * 60);

    let hoursLeft = null;
    let minutesLeft = null;

    if (hours !== 0) {
      if (hours > 1) {
        hoursLeft = hours + ' hours and ';
      } else if (hours === 1) {
        hoursLeft = hours + ' hour and ';
      }
    }

    if (minutes !== 0) {
      if (minutes > 1) {
        minutesLeft = minutes + ' minutes left ';
      } else if (hours === 1) {
        minutesLeft = minutes + ' minute left ';
      }
    }

    return hoursLeft + minutesLeft;
  }

  protected getPollVoteCount (pollOptions): number {
    let total = 0;
    for ( let i = 0; i < pollOptions.length; i++ ) {
      total += pollOptions[i].count;
    }

    return total;
  }

  protected onPollVote (option, pollOptions): void {
    this.postApiService.promiseVotePoll(option.id).then(response => {
      console.log('response', response);
      this.postSavedSubcribers();
    }, error => {
      console.log('error', error);
    });
  }

  protected getPollPercentage (option, pollOptions): string {
    // assign a default value for count if there is non
    // meaning this object comes upon clicking add post
    if (!option.count) { option.count = 0; }
    let totalVotes = this.getPollVoteCount(pollOptions);
    let percentage = option.count === 0 ? 0 : (option.count / totalVotes) * 100;
    let percent = percentage.toFixed(1);

    return percent;
  }

  private checkIfThereAreStillPostAvailable (posts: PostModel[]|CampusPostModel[]): void {
    if (posts.length === 0) {
      this.btnLoadMoreText = 'No More Posts To Show';
    }
  }

  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getPostSaveName());
    PostEmitter.removeSubscriber(PostEmitter.getPostSaveName());
  }
}

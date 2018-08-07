import {
  Component,
  Input,
  EventEmitter,
  SimpleChanges
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
  UserModel,
  CampusPostModel,
  CampusCourseFeedPostModel,
  CampusClassPostModel,
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
  UserService,
} from '../../../../services';
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

  @Input() protected posts: Array<PostModel|CampusPostModel|CampusCourseFeedPostModel|CampusClassPostModel> = [];
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number
  } = {name: 'home'};
  @Input() protected user: UserModel;
  protected btnLoadMoreText = 'Load More';
  protected notPostMessage: string;
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;

  public ngOnInit (): void {
    this.getSharedPostSubscriber();
    this.postSavedSubcribers();
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (this.posts.length === 0 && changes.posts.previousValue) {
      this.notPostMessage = 'No Post Yet. Be the one to POST';
    }
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
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
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
    let campusId: any;

    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseGetAllPost(this.limit, this.offset)
          .then((posts: PostModel[]) => {
            this.posts = this.posts.concat(posts);
            this.checkIfThereAreStillPostAvailable(posts);
          });
        break;
      case 'campus':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseGetAllPost(campusId, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
          });
        break;
      case 'campusFreshersFeed':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusApiService.promiseGetAllFreshersFeedPost(campusId, campusFreshersFeedId, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
          });
        break;
      case 'campusCourseFeed':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusCourseFeedId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusApiService.promiseGetAllCoursePost(campusId, campusCourseFeedId)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
          });
        break;
      case 'campusClasses':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusClassId = parseInt(CryptoUtilities.decipher(this.route.campusClassId), 10);
        this.campusApiService.promiseGetAllClassPost(campusId, campusClassId, this.limit, this.offset)
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
        hoursLeft = hours + ' hours ';
      } else if (hours === 1) {
        hoursLeft = hours + ' hour ';
      }
    }

    if (minutes !== 0) {
      if (minutes > 1) {
        minutesLeft = minutes + ' minutes left ';
      } else if (hours === 1) {
        minutesLeft = minutes + ' minute left ';
      }
    }

    return hoursLeft + (minutesLeft ? 'and ' + minutesLeft : 'left');
  }

  protected getPollVoteCount (pollOptions): number {
    let total = 0;
    for ( let i = 0; i < pollOptions.length; i++ ) {
      total += pollOptions[i].count;
    }

    return total;
  }

  protected onPollVote (option, pollOptions): void {
    console.log(this.route);
    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseVotePoll(option.id)
          .then(response => {})
          .catch(error => {});
        break;
      case 'campus':
      case 'campusFreshersFeed':
      case 'campusCourseFeed':
      case 'campusClasses':
        this.campusApiService.promiseVotePoll(option.id)
          .then(response => {})
          .catch(error => {});
        break;
    }
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

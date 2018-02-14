import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  UserService,
  PostService,
  AccountSettingService,
  AuthenticationService,
  CourseService
} from '../../../services/services';
import {
  UserResponse,
  UserCreditsResponse,
  PostsReponse,
  PostResponse
} from '../../../models/models';
import {
  MatDialog
} from '@angular/material';
import {
  SharedPostDetailModalComponent
} from '../../shared/modals/post-detail/post-detail.component';
import {
  ShareModalComponent
} from '../../shared/share-modal/share-modal.component';
import {
  EmitterService
} from '../../shared/emitter/emitter.component';
import {
  ShowImageComponent
} from '../../shared/show-image/show-image.component';
import * as Ps from 'perfect-scrollbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (
    private userService: UserService,
    private postservice: PostService,
    private accountservice: AccountSettingService,
    private authservice: AuthenticationService,
    private couserservice: CourseService,
    public dialog: MatDialog,
  ) {
    this.isDisabled = false;
    this.getUserCredits();
  }

  private postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private limit = 5;
  private offset = 10;
  private hasAddedPostCounter = 0;
  private isDisabled = false;
  private counter = 0;
  private starsPercentage     = '';
  private user: any;
  protected stars = 0;
  protected posts = [];
  protected credits = 0;
  protected newstory = {};
  protected following = 0;
  protected followers = 0;
  protected newstories = [];
  protected showmore = false;
  protected invitepeer = { email: '' };
  protected btnLoadMoreText = 'load more...';

  public ngOnInit (): void {
    this.getUserProfile();
    this.getPosts();
    this.postSavedSubcriber();

    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }
    /*Skipped since api not available yet*/
    const user = this.userService.getLoggedInUser();
    this.authservice.getfollowers(user ? user.id : 0)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Error Retrieving Followers');
      console.log(error);
    });

    this.authservice.getfollowingusers(user ? user.id : 0)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });

    this.postservice.gettopstories()
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  private getUserCredits (): void {
    this.accountservice.getusercredits()
    .subscribe((response: UserCreditsResponse) => {
      this.credits = response.userCredits.totalCredits;

      let result = (this.credits /  100) * 20;
      if (result >= 100) {
        this.stars = 100;
      } else {
        this.stars = result;
      }
      this.starsPercentage = this.getStars(this.stars);

    }, error => {
      console.log('Error retrieving User Credits');
      console.log(error);
    });
  }

  private getStars (credits): string {
  let val = parseFloat(credits.toString());
  return val + '%';
}

  /*Get User info then display name on the sidenav*/
  protected getUserProfile (): void {
    this.accountservice.getUserProfile()
    .subscribe((response: UserResponse) => {
      this.user = response.user;
    }, error => {
      console.log(error);
    });
  }

  protected inviteuser (): void {
    this.accountservice.invitebyemail(this.invitepeer)
    .subscribe(resp => {
      alert('An Email Invite has been sent out');
    }, error => {
      console.error('Error Inviting User');
      console.error(error);
    });
  }

  protected moreNews (e): void {
    this.showmore = !this.showmore;
    $(e.currentTarget).find('.view_more').text(this.showmore ? 'View Less' : 'View More');
  }

/*Waiting for toppost api*/
  protected reloadnews (): void {
    this.postservice.gettopstories()
    .subscribe(response => {
      console.log(response);
      // this.newstories = response.news;
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  protected openInvite (): void {
  }

  protected openPostDetail (): void {
    this.dialog.open(SharedPostDetailModalComponent);
    setTimeout(() => {
      const container = $('.mat-dialog-container')[0];
    }, 200);
  }

  protected share (): void {
    this.dialog.open(ShareModalComponent);
  }

  protected openAvatar (): void {
    this.dialog.open(ShowImageComponent, {
      panelClass: 'avatar-dialog',
      data: {
        profilePicture: this.user.profilePicture
      },
    });
  }

  /*Subscribe on postSaveEmitter in order to refresh post list after posting new*/
  private postSavedSubcriber (): void {
    this.postSavedSubscriber
    .subscribe(response => {
      this.postservice.getpost(response)
      .subscribe((data: PostResponse) => {
        this.posts.unshift(data.post);
        this.hasAddedPostCounter += 1;
      });
    });
  }

  /*Get Posts List From Api*/
  protected getPosts (): void {
    this.postservice.getallposts(10, 0)
    .subscribe((response: PostsReponse) => {
      this.posts = response.posts;
      if (this.posts.length <= 0) {
        this.isDisabled = true;
        this.btnLoadMoreText = 'No More Posts To Show';
      }
    }, error => {
      // alert('Error Retrieving All Posts');
    });
  }

  protected loadMorePost (): void {
    /*Disable post button after submit to prevent post duplication*/
    this.isDisabled = true;
    this.counter = this.hasAddedPostCounter;

    this.offset = this.offset + this.counter;
    this.postservice.getallposts(this.limit, this.offset)
    .subscribe((response: PostsReponse) => {
      this.offset = 5 + this.offset;
      this.limit = 5;
      this.posts = this.posts.concat(response.posts);
      this.hasAddedPostCounter = 0;

      if (response.posts.length > 0) {
        this.isDisabled = false;
      } else {
        this.btnLoadMoreText = 'No More Posts To Show';
      }

    }, error => {
    });
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    EmitterService.clear(['postSaveEmitter']);
  }
}

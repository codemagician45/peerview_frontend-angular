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
  MatDialog
} from '@angular/material';
import {
  PostDetailComponent
} from '../../shared/modal/components/PostDetailComponent';
import {
  ShareModalComponent
} from '../../shared/share-modal/share-modal.component';
import {
  EmitterService
} from '../../shared/emitter/emitter.component';
import {
  OpenInviteComponent
} from '../../community/shared/modals/components/OpenInviteComponent';
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
    private _userService: UserService,
    private _postservice: PostService,
    private _accountservice: AccountSettingService,
    private _authservice: AuthenticationService,
    private _couserservice: CourseService,
    public dialog: MatDialog,
  ) {
    this._isDisabled = false;
  }

  private _postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private _limit = 5;
  private _offset = 10;
  private _hasAddedPostCounter = 0;
  private _isDisabled = false;
  private _counter = 0;
  private _user: any;
  protected stars = 0;
  protected posts = [];
  protected credits = 0;
  protected newstory = {};
  protected following = 0;
  protected followers = 0;
  protected newstories = [];
  protected showmore = false;
  protected invitepeer = { email: '' };

  public ngOnInit (): void {
    this.getUserProfile();
    this.getPosts();
    this.postSavedSubcriber();

    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }

    this._accountservice.getusercredits()
    .subscribe((response: any) => {
      this.credits = response.userCredits.totalCredits;
      if (this.credits > 400) {
        this.stars = 5;
      } else if (this.credits > 300) {
        this.stars = 4;
      } else if (this.credits > 200) {
        this.stars = 3;
      } else if (this.credits > 100) {
        this.stars = 2;
      } else if (this.credits > 0) {
        this.stars = 1;
      }
    }, (error) => {
      console.log('Error retrieving User Credits');
      console.log(error);
    });

    const user = this._userService.getLoggedInUser();
    this._authservice.getfollowers(user ? user.id : 0).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log('Error Retrieving Followers');
      console.log(error);
    });

    this._authservice.getfollowingusers(user ? user.id : 0)
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });

    this._postservice.gettopstories()
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  /*Get User info then display name on the sidenav*/
  protected getUserProfile (): void {
    this._accountservice.getUserProfile()
    .subscribe((response: any) => {
      this._user = response.user;
    }, error => {
      console.log(error);
    });
  }

  protected inviteuser (): void {
    this._accountservice.invitebyemail(this.invitepeer).subscribe(resp => {
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

  protected reloadnews (): void {
    this._postservice.gettopstories().subscribe(resp => {
      if (resp['error'] === false) {
        this.newstories = resp['news'];
      }
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  protected postLink (e): void {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected pollLink (e): void {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected shareStoryLink (e): void {
    $('.create-post, .brain-map, .ask-question, .create-poll').hide();
    $('.share-story').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected openInvite (): void {
    this.dialog.open(OpenInviteComponent);
  }

  protected openPostDetail (): void {
    this.dialog.open(PostDetailComponent);
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
        profilePicture: this._user.profilePicture
      },
    });
  }

  /*Subscribe on postSaveEmitter in order to refresh post list after posting new*/
  protected postSavedSubcriber (): void {
    this._postSavedSubscriber.subscribe(response => {
      this._postservice.getpost(response).subscribe((data: any) => {
        this.posts.unshift(data.post);
        this._hasAddedPostCounter += 1;
      });
    });
  }

  /*Get Posts List From Api*/
  protected getPosts (): void {
    this._postservice.getallposts(10, 0).subscribe((response: any) => {
      this.posts = response.posts;
      if (this.posts.length <= 0) {
        this._isDisabled = true;
        $('.btn-load-more-posts').text('No More Posts To Show');
      }
    }, error => {
      // alert('Error Retrieving All Posts');
    });
  }

  protected loadMorePost (): void {
    /*Disable post button after submit to prevent post duplication*/
    this._isDisabled = true;
    this._counter = this._hasAddedPostCounter;

    this._offset = this._offset + this._counter;
    this._postservice.getallposts(this._limit, this._offset)
    .subscribe((response: any) => {
      this._offset = 5 + this._offset;
      this._limit = 5;
      this.posts = this.posts.concat(response.posts);
      this._hasAddedPostCounter = 0;
      let responseLength = response.length;
      if (response.posts.length > 0) {
        this._isDisabled = false;
      } else {
        $('.btn-load-more-posts').text('No More Posts To Show');
      }
    }, error => {
    });
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    EmitterService.clear(['postSaveEmitter']);
  }
}

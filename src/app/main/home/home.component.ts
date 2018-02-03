import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService, PostService, AccountSettingService, AuthenticationService, CourseService } from "../../../services/services";
import { MatDialog } from "@angular/material";
import { PostDetailComponent } from "../../shared/modal/components/PostDetailComponent";
import { ShareModalComponent } from "../../shared/share-modal/share-modal.component";
import { EmitterService } from '../../shared/emitter/emitter.component';
import * as Ps from 'perfect-scrollbar';
import { OpenInviteComponent } from "../../community/shared/modals/components/OpenInviteComponent";
import { ShowImageComponent } from "../../shared/show-image/show-image.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _postservice: PostService,
    private _accountservice: AccountSettingService,
    private _authservice: AuthenticationService,
    private _couserservice: CourseService,
    public dialog: MatDialog,
  ) {
    this._isDisabled = false;
  }
  stars = 0;
  posts = [];
  credits = 0;
  userData = null;
  newstory = {};
  following = 0;
  followers = 0;
  newstories = [];
  showmore = false;
  invitepeer = { email: "" };
  private _postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private _limit      = 5;
  private _offset     = 10;
  private _hasAddedPostCounter = 0;
  private _isDisabled    = false;
  private _counter = 0;

  ngOnInit() {
    this.getUserInfo();
    this.getPosts();
    this.postSavedSubcriber();

    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: "fixed", top: "86px" });
    }

    this._accountservice.getusercredits().subscribe(resp => {
      this.credits = resp['userCredits']['totalCredits'];
      if (this.credits > 400) { this.stars = 5; }
      else if (this.credits > 300) { this.stars = 4; }
      else if (this.credits > 200) { this.stars = 3; }
      else if (this.credits > 100) { this.stars = 2; }
      else if (this.credits > 0) { this.stars = 1; }
    }, error => {
      console.log('Error retrieving User Credits');
      console.log(error);
    });

    const user = this._userService.getLoggedInUser();
    this._authservice.getfollowers(user ? user.id : 0).subscribe(resp => {
      if (resp['error'] === false) { this.followers = resp['followers'].length }
    }, error => {
      console.log('Error Retrieving Followers');
      console.log(error);
    });
    this._authservice.getfollowingusers(user ? user.id : 0).subscribe(resp => {
      if (resp['error'] === false) { this.following = resp['followers'].length }
    }, error => {
      console.log(error);
    });
    this._postservice.gettopstories().subscribe(resp => {
      if (resp['error'] === false) {
        this.newstories = resp['news'];
      }
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  /*Get User info then display name on the sidenav*/
  getUserInfo() {
    let user = localStorage.getItem('user');
    let userInfo = JSON.parse(user);
    let userId = userInfo.id;
    this._accountservice.getUserInfo(userId).subscribe(response => {
      this.userData = response['user'];
      if (response['error'] === false) {
        alert(response['Message']);
      }
    }, error => {
      console.log(error);
    })
  }

  inviteuser() {
    this._accountservice.invitebyemail(this.invitepeer).subscribe(resp => {
      alert('An Email Invite has been sent out');
    }, error => {
      console.error("Error Inviting User");
      console.error(error);
    });
  }
  moreNews(e) {
    this.showmore = !this.showmore;
    $(e.currentTarget).find('.view_more').text(this.showmore ? 'View Less' : 'View More')
  }
  reloadnews() {
    this._postservice.gettopstories().subscribe(resp => {
      if (resp['error'] === false) {
        this.newstories = resp["news"];
      }
    }, error => {
      console.log('Error Retrieving stories');
      console.log(error);
    });
  }

  postLink(e) {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest("li").addClass("active");
  }

  pollLink(e) {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  shareStoryLink(e) {
    $('.create-post, .brain-map, .ask-question, .create-poll').hide();
    $('.share-story').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  openInvite() {
    this.dialog.open(OpenInviteComponent);
  }

  openPostDetail() {
    this.dialog.open(PostDetailComponent);
    setTimeout(() => {
      // const container = document.querySelector('.mat-dialog-container');
      const container = $('.mat-dialog-container')[0];
      //Ps.initialize(container);
    }, 200)
  }

  share() {
    this.dialog.open(ShareModalComponent);
  }

  openAvatar() {
    this.dialog.open(ShowImageComponent, {
      panelClass: 'avatar-dialog',
      data: {
        src: '/assets/images/profile-pic-lg.jpg'
      },
    });
  }

  /*Subscribe on postSaveEmitter in order to refresh post list after posting new*/
  postSavedSubcriber() {
    this._postSavedSubscriber.subscribe(response => {
      this._postservice.getpost(response).subscribe((data: any) => {
        this.posts.unshift(data.post);
        this._hasAddedPostCounter += 1;
      })
    })
  }
  /*Get Posts List From Api*/
  getPosts() {
    this._postservice.getallposts(10, 0).subscribe((response: any) => {
      this.posts = response.posts;
      if (this.posts.length <= 0) {
        this._isDisabled = true;
        $('.btn-load-more-posts').text('No More Posts To Show');
      }
    }, error => {
      // alert("Error Retrieving All Posts");
    })
  }

  loadMorePost() {
    /*Disable post button after submit to prevent post duplication*/
    this._isDisabled = true;
    this._counter = this._hasAddedPostCounter;

    this._offset = this._offset + this._counter;
    this._postservice.getallposts(this._limit, this._offset).subscribe((response: any) => {
      this._offset       = 5 + this._offset;
      this._limit        = 5;
      this.posts = this.posts.concat(response.posts);
      this._hasAddedPostCounter = 0;
      console.log(this._hasAddedPostCounter, this._offset)
      let responseLength = response.length;
      if (response.posts.length > 0) {
        this._isDisabled = false;
      } else {
        $('.btn-load-more-posts').text('No More Posts To Show');
      }
    }, error => {
      // alert("Error Retrieving All Posts");
    })
    // if (this._totalPosts )
  }
  /*Destroy subscriber*/
  ngOnDestroy() {
    EmitterService.clear(['postSaveEmitter']);
  }

}

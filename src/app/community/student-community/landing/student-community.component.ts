import {
  Component,
  OnInit
} from '@angular/core';
import {
  CourseModel,
  UserModel,
  CommunityPostModel, PostModel
} from '../../../shared/models';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CourseApiService,
  CommunityApiService, PostApiService
} from '../../../../services/api';
import {
  UserService,
  CourseService
} from '../../../../services';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  ComunityMobileAskQuestionMobileComponent,
  SharedImagePreviewComponent
} from '../../../shared/modals';
import {
  PostEmitter
} from '../../../shared/emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  CommunityPostFollow
} from '../../../shared/models/community-post-follow';
import {Link, NgxLinkifyjsService} from 'ngx-linkifyjs';

@Component({
  selector: 'student-community-component',
  templateUrl: './student-community.component.html',
  styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent implements OnInit {
  constructor (
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService,
    private route: ActivatedRoute,
    private router: Router,
    private courseApiService: CourseApiService,
    private communityApiService: CommunityApiService,
    private dialog: MatDialog,
    private overlay: Overlay) {
  }

  protected posts: PostModel[] = [];
  protected user_home = UserService.getUser();
  private limit = 5;
  private offset = 10;
  private offset_post = 30;
  private postSaveSubscriber: any;

  private hasImageSelected: boolean = false;
  private courses = [];
  private user: UserModel;
  protected communityPost: CommunityPostModel = new CommunityPostModel();


  protected communityPosts: CommunityPostModel[] = [];

  protected isToggleUploadComponentVisible: boolean = false;
  protected sampleReplyString: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
  protected sampleAnswer = 'It is a long established fact that a reader will be distracted by the readable \
  content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less \
  normal distribution of letters.,';
  protected showFullAnswer: Array<Array<boolean>> = [];
  private routeSubscriber: any;
  private isShowCommunityAnswerPost: number = 0;

  private post_case = new Date();

  public ngOnInit (): void {

    this.getCourse();
    this.user = UserService.getUser();
    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.postId && params.courseId) {
          const postId = params.postId && parseFloat(CryptoUtilities.decipher(params.postId));
          const courseId = params.postId && parseFloat(CryptoUtilities.decipher(params.courseId));
          this.communityPost.courseId = courseId;
          this.getStudentCommunityFeedByCourseIdAndPostId(courseId, postId);
          return;
        } else {
          if (CourseService.getCourse()) {
            const course = CourseService.getCourse();
            this.communityPost.courseId = course.id;
            this.getStudentCommunityFeed(this.communityPost.courseId);
            return;
          }
          if (this.user['userCourses'] && this.user['userCourses'][0] && this.user['userCourses'][0].course) {
            CourseService.setCourse(this.user['userCourses'][0].course);
            this.communityPost.courseId = this.user['userCourses'][0].course.id;
            this.getStudentCommunityFeed(this.communityPost.courseId);
          }
        }
      });
  }


  private getStudentCommunityFeedByCourseIdAndPostId (courseId, postId): void {

    this.communityApiService.promiseGetSingleCommunityPostsData(courseId, postId)
      .then((responseData: CommunityPostModel) => {
        this.communityPosts = [responseData];
        this.communityPosts.forEach(async post => {
          let findUrl: Link[] = await this.linkifyService.find(post.message);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                post.message = `${(post.message.replace(regex, ' ')).trim()}
                  <div class="link-preview">
                    <div class="link-area">
                    <div class="og-image">
                      <a href="${res.data.url}" target="_blank">
                        <img src="${res.data.image}" alt="logo" />
                      </a>
                    </div>
                    <div class="descriptions">
                      <div class="og-title">${res.data.title}</div>
                      <div class="og-description">${res.data.description}</div>
                      <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                    </div>
                    </div>
                  </div>`;
              });
          }
        });
        this.isToggleUploadComponentVisible = false;
        this.communityPost.init();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private getStudentCommunityFeed (courseId): void {

    let that = this;
    this.communityApiService.promiseGetAllCommunityPostsData(courseId)
      .then((responseData: CommunityPostModel[]) => {

        that.communityPosts = responseData;
        that.communityPosts.forEach(async post => {
          let findUrl: Link[] = await this.linkifyService.find(post.message);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                post.message = `${(post.message.replace(regex, ' ')).trim()}
                  <div class="link-preview">
                    <div class="link-area">
                    <div class="og-image">
                      <a href="${res.data.url}" target="_blank">
                        <img src="${res.data.image}" alt="logo" />
                      </a>
                    </div>
                    <div class="descriptions">
                      <div class="og-title">${res.data.title}</div>
                      <div class="og-description">${res.data.description}</div>
                      <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                    </div>
                    </div>
                  </div>`;
              });
          }
        });
        that.isToggleUploadComponentVisible = false;
        that.communityPost.init();
        // let d = that.post_case.getDate();
        // if (d > that.offset_post) {
        //   document.body.innerHTML = '';
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }

  private getCourse (): void {

    this.courseApiService.promiseGetAllCourses()
      .then((courses: CourseModel[]) => {
        this.courses = courses;
      })
      .catch(() => {
      });

    // this.courses = [{id: 1, name: 'programming'}, {id: 2, name: 'Data structure'}, {id: 3, name: 'Computer Networks'}];

  }

  protected onAskQuestion (): void {
    if (this.hasImageSelected) {
      PostEmitter.uploadImages().emit();
    } else {
      this.createQuestion();
    }
  }

  protected onChangeCourse (item): void {
    let index = this.courses.findIndex((filter: any) => {
      return filter.id === parseInt(item, 10);
    });
    if (index > -1) {
      CourseService.setCourse(this.courses[index]);
    }
    this.communityPost.courseId = item;
    this.getStudentCommunityFeed(this.communityPost.courseId);
  }

  protected onOpenAskQuestionModal (): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'ask-a-question-modal';
    dialogConfig.id = 'SharedCommunityMobileAskQuestionMobileComponent';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {user: this.user, communityPost: this.communityPost};
    this.dialog.open(ComunityMobileAskQuestionMobileComponent, dialogConfig).beforeClose()
      .subscribe(response => {
        this.getStudentCommunityFeed(this.communityPost.courseId);
      });
  }

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
  }

  protected onUploadComplete (attachments): void {
    this.communityPost.attachments = attachments;
    this.createQuestion();
  }

  private createQuestion (): void {
    this.communityPost.area = 'community';
    this.communityPost.type = 'post';

    this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPost)
      .then(() => {
        this.communityPost.init();
        this.getStudentCommunityFeed(this.communityPost.courseId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  protected onAnswerQuestion (id): void {
    const encryptedItemId = CryptoUtilities.cipher(id);
    const encryptedItemCourseId = CryptoUtilities.cipher(this.communityPost.courseId);

    this.router.navigate([`../${encryptedItemCourseId}/${encryptedItemId}`], {relativeTo: this.route});
  }

  protected trimStory (answer, maxCharacters): string {
    let trimmedString = answer.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.communityApiService.promiseRemoveCommunityPost(postId)
      .then(() => {
        let index = this.communityPosts.findIndex((filter: any) => {
          return filter.id === postId;
        });
        if (index > -1) {
          this.communityPosts.splice(index, 1);
        }
      }).catch((error) => {
      console.error('error', error);
    });
  }

  protected onFollowQuestion (post): void {
    // follow here the post
    const follow = new CommunityPostFollow();
    follow.postId = post.id;
    follow.courseId = this.communityPost.courseId;
    if (post.isUserFollowCommunityQuestion) {
      this.communityApiService.promiseUnFollowCommunityPost(this.communityPost.courseId, post.id)
        .then(() => {
          let index = this.communityPosts.findIndex((filter: any) => {
            return filter.id === post.id;
          });
          if (index > -1) {
            this.communityPosts[index].isUserFollowCommunityQuestion = false;
          }
        }).catch((error) => {
        console.error('error', error);
      });
    } else {
      this.communityApiService.promiseFollowCommunityPost(this.communityPost.courseId, post.id, follow)
        .then(() => {
          let index = this.communityPosts.findIndex((filter: any) => {
            return filter.id === post.id;
          });
          if (index > -1) {
            this.communityPosts[index].isUserFollowCommunityQuestion = true;
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }


  protected onOpenShowImageDialogComponent (user): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: user.socialImage
        ? (user.profilePicture === 'avatar' ? user.socialImage : user.profilePicture)
        : user.profilePicture,
      source: 'profile-picture'
    };
    this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }


}

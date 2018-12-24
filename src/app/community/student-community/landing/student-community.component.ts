import {
  Component
} from '@angular/core';
import {
  CourseModel,
  UserModel,
  CommunityPostModel
} from '../../../shared/models';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CourseApiService,
  CommunityApiService
} from '../../../../services/api';
import {
  UserService
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
  ComunityMobileAskQuestionMobileComponent
} from '../../../shared/modals';
import {
  PostEmitter
} from '../../../shared/emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {CommunityPostFollow} from '../../../shared/models/community-post-follow';

@Component({
  selector: 'student-community-component',
  templateUrl: './student-community.component.html',
  styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private courseApiService: CourseApiService,
    private communityApiService: CommunityApiService,
    private dialog: MatDialog,
    private overlay: Overlay) { }

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

  public ngOnInit (): void {
    this.getCourse ();
    this.user = UserService.getUser();

    if (this.user['userCourses'] && this.user['userCourses'][0] && this.user['userCourses'][0].course) {
      this.communityPost.courseId = this.user['userCourses'][0].course.id;
      this.getStudentCommunityFeed(this.communityPost.courseId);

    }
  }

  private getStudentCommunityFeed (coureseId): void {
    this.communityApiService.promiseGetAllCommunityPostsData(coureseId)
      .then((responseData: CommunityPostModel[]) => {
        this.communityPosts = responseData;
        this.isToggleUploadComponentVisible = false;
        this.communityPost.init();
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
      .catch(() => { });
  }

  protected onAskQuestion (): void {
    if (this.hasImageSelected) {
      PostEmitter.uploadImages().emit();
    } else {
      this.createQuestion();
    }
  }

  protected onChangeCourse (item): void {
    this.communityPost.courseId = item;
    this.getStudentCommunityFeed(this.communityPost.courseId);
  }

  protected onOpenAskQuestionModal (): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'ask-a-question-modal';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = this.user;
    this.dialog.open(ComunityMobileAskQuestionMobileComponent, dialogConfig);
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

    this.router.navigate([`../${encryptedItemCourseId}/${encryptedItemId}`], { relativeTo: this.route });
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
        if (index > -1 ) {
          this.communityPosts.splice(index, 1);
        }
      }).catch((error) => {
        console.error('error', error);
    });
  }
  protected onFollowQuestion (postId: number): void {
    // follow here the post
    const follow  = new CommunityPostFollow();
    follow.postId = postId;
    this.communityApiService.promiseFollowCommunityPost(postId, follow)
      .then(() => {
      }).catch((error) => {
        console.error('error', error);
    });
  }
}

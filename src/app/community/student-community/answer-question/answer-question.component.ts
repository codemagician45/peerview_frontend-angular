import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CommunityApiService, PostApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';
import {
  CommunityPostModel,
  CommunityAnswerQuestionModel
} from '../../../shared/models';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  SharedCommunityPostReplyComponent
} from '../../../shared/modals';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  Location
} from '@angular/common';
import {
  CommunityPostFollow
} from '../../../shared/models/community-post-follow';
import {
  PostEmitter
} from '../../../shared/emitter';
import {SharedSetRatingsModalComponent} from '../../../shared/components/set-ratings-modal/set-ratings.component';
import { Link, NgxLinkifyjsService } from 'ngx-linkifyjs';

@Component({
  selector: 'answer-question-component',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
export class AnswerQuestionCommunityComponent implements OnInit {


  constructor (
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private communityApiService: CommunityApiService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {
  }

  private communityPost: any;
  protected user = UserService.getUser();
  protected communityAnswer: CommunityAnswerQuestionModel = new CommunityAnswerQuestionModel();
  protected isUserAnsweringQuestion: Boolean = false;
  protected communityPosts: CommunityPostModel[] = [];
  protected isToggleUploadComponentVisible: boolean = false;
  private hasImageSelected: boolean = false;


  public ngOnInit (): void {
    this.route.params.subscribe((params) => {
      this.communityAnswer.courseId = parseInt(CryptoUtilities.decipher(params.courseId), 10);
      this.communityAnswer.questionId = parseInt(CryptoUtilities.decipher(params.id), 10);
      this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
    });
  }

  private getQuestionDetails (courseId, questionId): void {
    this.communityApiService.promiseGetQuestionDetail(courseId, questionId)
      .then(async (responseData: any) => {
        this.communityPost = responseData;
        let findUrl: Link[] = await this.linkifyService.find(this.communityPost.message);
        if (findUrl.length > 0 && findUrl[0].type === 'url') {
          let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
            .then((res: any) => {
              this.communityPost.message = `${(this.communityPost.message.replace(regex, ' ')).trim()}
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

        this.communityPost.reply.forEach(async reply => {
          findUrl = await this.linkifyService.find(reply.comment);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                reply.comment = `${(reply.comment.replace(regex, ' ')).trim()}
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
      });
  }

  protected onReply (formIsValid): void {
    if (this.hasImageSelected) {
      PostEmitter.uploadImages().emit();
    } else {
      this.onSubmit(formIsValid);
    }
  }

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
  }

  protected onUploadComplete (attachments): void {
    this.communityAnswer.attachments = attachments;
    this.onSubmit(true);
  }

  protected onSubmit (formIsValid): void {
    if (formIsValid) {
      this.isUserAnsweringQuestion = true;

      this.communityApiService.promiseCreateAnswerToQuestion(this.communityAnswer)
        .then(() => {
          this.isUserAnsweringQuestion = false;
          this.communityAnswer.comment = '';
          this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
          this.isToggleUploadComponentVisible = false;

        });
    }
  }

  protected onClickReplyLike (reply): void {
    if (reply) {
      this.communityApiService.promiseLikeCommunityPostReply(reply.id)
        .then(() => {

          let index = this.communityPost['reply'].findIndex((filter: any) => {
            return filter.id === reply.id;
          });

          if (index > -1) {
            if (this.communityPost['reply'][index].replyLike) {
              if (this.communityPost['reply'][index].replyLike && this.communityPost['reply'][index].replyLike[0] === undefined) {
                this.communityPost['reply'][index].replyLike = [{
                  replyCount: 0
                }];
              }
            }
            this.communityPost['reply'][index].replyLike[0].replyCount += 1;
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }

  protected onDeletePostReply (replyId): void {
    if (replyId) {
      this.communityApiService.promiseRemoveCommunityPostReply(replyId)
        .then(() => {
          let index = this.communityPost['reply'].findIndex((filter: any) => {
            return filter.id === replyId;
          });
          if (index > -1) {
            this.communityPost['reply'].splice(index, 1);
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.communityApiService.promiseRemoveCommunityPost(postId)
      .then(() => {
        this.location.back();
      }).catch((error) => {
      console.error('error', error);
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

  protected goToBack (): void {
    this.location.back();
  }

  protected onFollowQuestion (post): void {
    // follow here the post
    const follow = new CommunityPostFollow();
    follow.postId = post.id;
    follow.courseId = this.communityAnswer.courseId;
    if (post.isUserFollowCommunityQuestion) {
      this.communityApiService.promiseUnFollowCommunityPost(this.communityAnswer.courseId, post.id)
        .then(() => {
          let index = this.communityPosts.findIndex((filter: any) => {
            return filter.id === post.id;
          });
          // if (index > -1) {
          this.communityPost.isUserFollowCommunityQuestion = false;
          console.log('sdd', this.communityPost);
          // }
        }).catch((error) => {
        console.error('error', error);
      });
    } else {
      this.communityApiService.promiseFollowCommunityPost(this.communityAnswer.courseId, post.id, follow)
        .then(() => {
          let index = this.communityPosts.findIndex((filter: any) => {
            return filter.id === post.id;
          });
          // f (index > -1) {i
          this.communityPost.isUserFollowCommunityQuestion = true;
          // }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }
}


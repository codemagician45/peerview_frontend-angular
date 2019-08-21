import {
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import {
  UserService,
} from '../../../../services';
import {
  UserModel,
  CommunityPostModel,
  CommunityAnswerQuestionModel
} from '../../models';
import {
  CommunityApiService, PostApiService
} from '../../../../services/api';
import { Link, NgxLinkifyjsService } from 'ngx-linkifyjs';

@Component({
  selector: 'shared-community-post-reply-component',
  templateUrl: './community-post-reply.component.html',
  styleUrls: ['./community-post-reply.component.scss']
})
export class SharedCommunityPostReplyComponent {
  constructor (
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService,
    private communityApiService: CommunityApiService,
    private cdRef: ChangeDetectorRef
  ) {}
  private user: UserModel = UserService.getUser();
  protected communityAnswer: CommunityAnswerQuestionModel = new CommunityAnswerQuestionModel();
  protected isUserCurrentlyCommenting = false;
  @Input() private communityPost: any;
  @Input() private reply: any;
  @Input() private courseId: number;
  @Input() private questionId: number;

  public ngOnInit (): void {
    this.communityAnswer.courseId = this.courseId;
    this.communityAnswer.questionId = this.questionId;
    this.communityAnswer.tagUserId = this.user.id;
    this.communityAnswer.quoteReplyId = this.reply.id;
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
          this.cdRef.detectChanges();
      });
  }
  private onCommunityPostReply (): void {
    this.isUserCurrentlyCommenting = true;
    this.communityApiService.promiseCreateAnswerToQuestion(this.communityAnswer)
      .then(() => {
        this.isUserCurrentlyCommenting = false;
        this.communityAnswer.comment = '';
        this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
      });
  }
  private onDeletePostReply (replyId): void {
    if (replyId) {
      this.communityApiService.promiseRemoveCommunityPostReply(replyId)
        .then(() => {
          let index = this.communityPost['reply'].findIndex((filter: any) => {
            return filter.id === replyId;
          });
          if (index > -1 ) {
            this.communityPost['reply'].splice(index, 1);
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }
}

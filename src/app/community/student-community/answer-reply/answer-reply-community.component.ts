import {Component, OnInit, Input} from '@angular/core';
import {CommunityApiService, PostApiService} from '../../../../services/api';
import {PostRateModel} from '../../../shared/models';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { SharedCommunityPostReplyComponent } from '../../../shared/modals';
import {
  Location
} from '@angular/common';
import { CryptoUtilities } from '../../../shared/utilities';
import { UserService } from '../../../../services';

@Component({
  selector: 'answer-reply-component',
  templateUrl: './answer-reply-community.component.html',
  styleUrls: ['./answer-reply-community.component.scss']
})

export class AnswerReplyCommunityComponent implements OnInit {
  constructor (
    private communityApiService: CommunityApiService,
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private overlay: Overlay
  ) {
  }

  @Input() public reply: any;
  @Input() public user: any;
  @Input() protected communityPost: any;
  @Input() protected communityAnswer: any;

  protected rate: PostRateModel = new PostRateModel();

  private showReplyRatingStarsPopup: boolean = false;

  public ngOnInit (): void {
  }

  protected onClickToggleReplyRatingStars (): void {
    this.showReplyRatingStarsPopup = !this.showReplyRatingStarsPopup;
  }

  protected onClickStarRating (numberOfStars: number): void {
    if (numberOfStars) {
      this.rate.rating = numberOfStars;
      this.communityApiService.promiseRateCommunityPostReply(this.reply.id, this.rate).then(response => {
        console.log('');
        this.showReplyRatingStarsPopup = false;
      });
    }
  }

  protected onClickCommentDetail (reply): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-comment-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      reply: reply,
      communityPost: this.communityPost,
      route: this.route,
      user: this.user,
      courseId: this.communityAnswer.courseId,
      questionId: this.communityAnswer.questionId
    };
    this.dialog.open(SharedCommunityPostReplyComponent, dialogConfig);
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

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

}

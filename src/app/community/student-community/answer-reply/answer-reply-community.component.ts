import {Component, OnInit, Input} from '@angular/core';
import {CommunityApiService} from '../../../../services/api';
import {PostRateModel} from '../../../shared/models';

@Component({
  selector: 'answer-reply-component',
  templateUrl: './answer-reply-community.component.html',
  styleUrls: ['./answer-reply-community.component.scss']
})

export class AnswerReplyCommunityComponent implements OnInit {
  constructor (
    private communityApiService: CommunityApiService,
  ) {
  }

  @Input() public reply: any;
  @Input() public user: any;
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
      });
    }
  }
}

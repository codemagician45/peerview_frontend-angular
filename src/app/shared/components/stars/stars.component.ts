import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  PostRateModel, PostModel
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-stars-component',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class SharedStarsComponent implements OnInit {
  constructor (
    private postApiService: PostApiService
  ) {}

  @Input() protected ratingCount: number = 0;
  protected stars: Array<string> = [];
  protected rate: PostRateModel = new PostRateModel();
  private post: PostModel = new PostModel();

  public ngOnInit (): void {
    this.starsToBeAdded();
  }

  /**
   * This would be added as an array
   * for the stars in the like of the
   * Post
   */
  private starsToBeAdded (): void {
    let roundOf = Math.round(this.ratingCount);

    Array.from({length: roundOf}, () => {
      this.stars.push('star');
    });

    if (roundOf > this.ratingCount) {
      this.stars.push('star_half');
    }

    let remainingStars = 5 - this.stars.length;

    Array.from({length: remainingStars}, () => {
      this.stars.push('star_border');
    });
  }

  protected onStarClick (numberOfStars): void {
    this.rate.rating = numberOfStars;
    this.post.id = 161;
    this.postApiService.promisePostRate(this.post, this.rate)
      .then(response => {
        console.log('successful rate', response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

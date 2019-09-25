import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {PostRateModel} from '../../models';

@Component({
  selector: 'shared-set-ratings-modal-component',
  templateUrl: './set-ratings.component.html',
  styleUrls: ['./set-ratings.component.scss']
})

export class SharedSetRatingsModalComponent implements OnInit {

  constructor () {
  }

  @Input() protected showStars: boolean = false;
  @Output() protected onStarClick = new EventEmitter();
  protected ratingCount: number = 0;
  protected stars: Array<string> = [];
  protected rate: PostRateModel = new PostRateModel();
  protected selectedNumberOfStars: number = 0;

  public ngOnInit (): void {
    this.starsToBeAdded();
  }

  protected clickOnStarClick (numberOfStars): void {
    this.selectedNumberOfStars = numberOfStars;
  }

  protected onOkClickSaveRating (): void {
    this.onStarClick.emit(this.selectedNumberOfStars);
    this.showStars = false;
  }

  public mouseover (numberOfStars): void {
    this.stars = [];

    Array.from({length: numberOfStars}, () => {
      this.stars.push('star');
    });

    let remainingStars = 5 - this.stars.length;

    Array.from({length: remainingStars}, () => {
      this.stars.push('star_border');
    });

    this.onStarHover(numberOfStars);
    this.selectedNumberOfStars = numberOfStars;
  }

  protected onStarHover (numberOfStars): void {
    this.rate.rating = numberOfStars;
  }

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
}


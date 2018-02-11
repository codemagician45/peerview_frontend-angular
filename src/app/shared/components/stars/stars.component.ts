import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'shared-stars-component',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class SharedStarsComponent implements OnInit {
  constructor () {}

  @Input() protected ratingCount: number = 0;
  protected stars: Array<string> = [];

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
}

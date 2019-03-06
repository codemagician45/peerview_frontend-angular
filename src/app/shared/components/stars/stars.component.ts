import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  PostModel
} from '../../models';

@Component({
  selector: 'shared-stars-component',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class SharedStarsComponent implements OnInit {
  constructor () {}

  @Input() protected ratingCount: number = 0;
  @Output() protected onStarClick = new EventEmitter();
  protected stars: Array<string> = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
  private post: PostModel = new PostModel();

  public ngOnInit (): void {
    this.starsToBeAdded();
  }

  public ngOnChanges (changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName) {
        const newChanges = changes[propName];
        if (newChanges.previousValue !== undefined && newChanges.currentValue !== newChanges.previousValue) {
          this.starsToBeAdded();
        }
      }
    }
  }

  /**
   * This would be added as an array
   * for the stars in the like of the
   * Post
   */
  private starsToBeAdded (): void {
    this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

    for (let i = 0; i < this.ratingCount; i++) {
      this.stars[i] = 'star';
    }
  }

  private starsEnterAdd (cnt): void {
    this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

    for (let i = 0; i < cnt; i++) {
      this.stars[i] = 'star';
    }
  }

  protected clickOnStarClick (numberOfStars): void {
    this.onStarClick.emit(numberOfStars);
  }

  protected onStarMouseEnter (numberOfStars): void {
    this.starsEnterAdd(numberOfStars);
  }

  protected onStarMouseLeave (numberOfStars): void {
    this.starsToBeAdded();
  }

}

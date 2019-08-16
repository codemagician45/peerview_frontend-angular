import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {PostApiService} from '../../../../services/api';
import {PostRateModel} from '../../models';

@Component({
  selector: 'shared-set-ratings-modal-component',
  templateUrl: './set-ratings.component.html',
  styleUrls: ['./set-ratings.component.scss']
})

export class SharedSetRatingsModalComponent implements OnInit {

  constructor (
    @Inject(MAT_DIALOG_DATA) protected postData: any,
    private router: Router,
    private dialog: MatDialog,
    private postApiService: PostApiService,
    public dialogRef: MatDialogRef<SharedSetRatingsModalComponent>
  ) {
  }

  protected ratingCount: number = 0;
  protected stars: Array<string> = [];
  protected rate: PostRateModel = new PostRateModel();

  public ngOnInit (): void {
    this.starsToBeAdded();
  }

  protected clickOnStarClick (numberOfStars): void {
    this.dialogRef.close(numberOfStars);
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


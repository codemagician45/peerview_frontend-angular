import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  UnfollowPopupComponent
} from '../../shared/unfollow-popup/unfollow-popup.component';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  constructor (public dialog: MatDialog) {}

  public ngOnInit (): void {}

  protected follow ($event): void {
    const button = $($event.currentTarget);
    const buttonText = $($event.currentTarget).find('.btn-text');
    const isFollowing = button.hasClass('following');

    if (isFollowing) {
      button.removeClass('btn-primary');
      button.removeClass('following');
      button.addClass('btn-blue');
      buttonText.text('Follow');
      this.dialog.open(UnfollowPopupComponent, {
        data: {
          name: 'Post'
        },
      });
    } else {
      button.removeClass('btn-blue');
      button.addClass('btn-primary');
      button.addClass('following');
      buttonText.text('Following');
    }
  }
}

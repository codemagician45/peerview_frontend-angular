import {
  Component,
  OnInit
} from '@angular/core';
import {
  SharedPostDetailModalComponent
} from '../../shared/modals/post-detail/post-detail.component';
import {
  MatDialog
} from '@angular/material';
import {
  NewMessageModalComponent
} from '../../shared/new-message-modal/new-message-modal.component';
import {
  PostToComponent
} from '../../shared/post-to/post-to.component';
import {
  ShowImageComponent
} from '../../shared/show-image/show-image.component';
import {
  UnfollowPopupComponent
} from '../../shared/unfollow-popup/unfollow-popup.component';
import {
  ReportModalUserComponent
} from '../../shared/report-modal-user/report-modal-user.component';
import * as Ps from 'perfect-scrollbar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor (
    public dialog: MatDialog
  ) {
    this.items = [1, 2, 3, 4, 5, 6, 7, 8];
    this.properties = {
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      onChange: function (): void {}
    };
  }

  public items: any;
  public properties: any;
  protected btnText = 'Follow';

  public ngOnInit (): void {}

  protected follow (): void {
    if (this.btnText === 'Following') {
      this.dialog.open(UnfollowPopupComponent, {
        data: {
          name: 'John Smith'
        },
      });
    }

    this.btnText = this.btnText === 'Follow' ? 'Following' : 'Follow';
  }

  protected openPostDetail (): void {
    this.dialog.open(SharedPostDetailModalComponent);
    setTimeout(() => {
      const container = $('.mat-dialog-container')[0];
    }, 200);
  }

  protected openMessage (): void {
    this.dialog.open(NewMessageModalComponent);
  }

  protected openPostTo (): void {
    this.dialog.open(PostToComponent);
  }

  protected openAvatar (): void {
    this.dialog.open(ShowImageComponent, {
      data: {
        src: '/assets/images/john.jpg'
      },
    });
  }

  protected report (): void {
    this.dialog.open(ReportModalUserComponent);
  }
}

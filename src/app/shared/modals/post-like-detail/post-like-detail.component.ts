import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  PostModel,
  UserModel
} from '../../models';

@Component({
  selector: 'shared-post-like-detail-modal-component',
  templateUrl: './post-like-detail.component.html',
  styleUrls: ['./post-like-detail.component.scss']
})
export class SharedPostLikeDetailModalComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected postLikeDetailData: any,
    private router: Router,
    private dialog: MatDialog
  ) {}

  protected post: PostModel = this.postLikeDetailData.post;
  protected user: UserModel = this.postLikeDetailData.user;

  public ngOnInit (): void {}

  protected onClickUserProfile (user): Promise<boolean> {
    /** Close Modal */
    this.dialog.closeAll();

    let userId = CryptoUtilities.cipher(user.id);

    if (user.id === this.user.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }
}

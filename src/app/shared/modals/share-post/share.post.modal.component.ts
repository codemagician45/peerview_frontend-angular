import {
  Component,
  OnInit,
  Inject,
  Output
} from '@angular/core';
import {
  DOCUMENT
} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  PostModel,
  SharePost,
  SharePostResponse
} from '../../models';
import {
  PostService
} from '../../../../services/services';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-share-post-modal',
  templateUrl: './share.post.modal.component.html',
  styleUrls: ['./share.post.modal.component.scss']
})
export class SharePostModalComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA) private post: PostModel,
    @Inject(DOCUMENT) private document: Document,
    private postservice: PostService,
    private dialog: MatDialog,
  ) {
    this.document.body.classList.add('mat-dialog-is-open');
  }

  protected share: SharePost = new SharePost();
  protected isCurrentlySharing = false;
  public ngOnInit (): void {}

  protected sharePost (): void  {
    this.isCurrentlySharing = true;

    MessageNotificationService.show({
      notification: {
        id: 'share-post-please-wait',
        message: 'Sharing post',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);

    this.postservice.sharepost(this.post.id, this.share)
    .subscribe((response: SharePostResponse) => {

      this.isCurrentlySharing = false;
      let sharePostModalComponent = this.dialog.getDialogById('SharePostModalComponent');
      sharePostModalComponent.close({
        postId: response.postId,
        shareMessage: this.share.message,
        postedBy: this.post,
      });
    }, error => {
      console.log(error);
      if (error.status === 400) {
        MessageNotificationService.show({
          notification: {
            id: 'share-post-error',
            message: 'Unable to Share Post.',
            reason: 'Share details should be filled in.',
            instruction: 'Please say something about this post.'
          }
        },
      NotificationTypes.Error);
    }
      this.isCurrentlySharing = false;
    });
  }

  public ngOnDestroy (): void {
    this.document.body.classList.remove('mat-dialog-is-open');
  }
}

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
  SharePostModel,
  IResponse
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'shared-share-post-modal-component',
  templateUrl: './share-post.modal.component.html',
  styleUrls: ['./share-post.modal.component.scss']
})
export class SharedSharePostModalComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA) private post: PostModel,
    @Inject(DOCUMENT) private document: Document,
    private postApiService: PostApiService,
    private dialog: MatDialog,
  ) {
    this.document.body.classList.add('mat-dialog-is-open');
  }

  protected share: SharePostModel = new SharePostModel();
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

    this.postApiService.promiseSharePost(this.post.id, this.share)
      .then((sharePost: PostModel) => {
        this.isCurrentlySharing = false;

        let sharePostModalComponent = this.dialog.getDialogById('SharePostModalComponent');
        sharePostModalComponent.close({
          postId: sharePost.id,
          shareMessage: this.share.message,
          postedBy: this.post,
        });

        MessageNotificationService.show({
          notification: {
            id: 'share-post-success',
            message: 'Your post has beed shared.',
            instruction: ''
          }
        },
        NotificationTypes.Success);
      })
      .catch(error => {
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

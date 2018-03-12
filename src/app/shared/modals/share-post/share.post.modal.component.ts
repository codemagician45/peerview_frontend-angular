import {
  Component,
  OnInit,
  Inject,
  Output
} from '@angular/core';
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

@Component({
  selector: 'app-share-post-modal',
  templateUrl: './share.post.modal.component.html',
  styleUrls: ['./share.post.modal.component.scss']
})
export class SharePostModalComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    private post: PostModel,
    private postservice: PostService,
    private dialog: MatDialog,
  ) {}

  protected share: SharePost = new SharePost();
  protected isCurrentlySharing = false;
  public ngOnInit (): void {}

  protected sharePost (): void  {
    this.isCurrentlySharing = true;
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
      this.isCurrentlySharing = false;
    });
  }
}

import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostService
} from '../../../../../services';
import {
  IPostToResponse
} from '../../../../shared/models';

@Component({
  selector: 'profile-left-sidebar-user-info-nessage-component',
  templateUrl: './post-to.component.html',
  styleUrls: ['./post-to.component.scss']
})
export class ProfileLeftSidebarUserInfoPostToDiaglogComponent implements OnInit {
  constructor (
    private dialog: MatDialog,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) protected user
  ) { }

  public ngOnInit (): void {}

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSendMessage (postMessage: HTMLTextAreaElement): void {
    this.postService.postTo(postMessage.value, this.user.id)
    .subscribe((response: IPostToResponse) => {
      console.log(response);
    });
  }
}

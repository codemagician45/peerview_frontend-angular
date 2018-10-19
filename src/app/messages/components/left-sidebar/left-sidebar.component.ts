import {
  Component
} from '@angular/core';
import {
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import {SharedCreateMessageComponent
} from '../../../shared/modals';

@Component({
  selector: 'messages-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class MessagesLeftSideBarComponent {
  constructor (
    private dialog: MatDialog
  ) {}

  protected onNewMessageClick (): void {
    // let queryParams = {
    //   newMsg: true
    // }

    // this.router.navigate([`/messages`], {queryParams});
    /* Added MatDialogConfig for adding a custom setting for this modal */
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'share-post-modal';
    dialogConfig.disableClose = true;
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = 'this.post';
    dialogConfig.id = 'SharePostModalComponent';
    this.dialog.open(SharedCreateMessageComponent, dialogConfig);
      // .afterClosed()
      // .subscribe((post: PostModel|CampusPostModel) => {
      //   if (post) {
      //     PostEmitter.postShare().emit(post);
      //   }
      // }, error => {
      //   console.log(error);
      // });
  }

}

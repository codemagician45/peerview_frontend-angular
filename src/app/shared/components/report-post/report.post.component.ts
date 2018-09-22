import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  ReportPostModalComponent,
  SharedConfirmModalComponent
} from '../../modals';
import {
  PostModel,
} from '../../models';

@Component({
  selector: 'report-post-component',
  templateUrl: './report.post.component.html',
  styleUrls: ['./report.post.component.scss']
})
export class SharedReportPostComponent {
  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}
  @Output() protected onDeletePost = new EventEmitter();
  @Input() protected post: PostModel;

  protected openReportModal (): void {
    this.dialog.open(ReportPostModalComponent, {
      data: this.post,
      id: 'SharedReportPostModalComponent'
    });
  }

  protected onOpenConfirmModal (): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.data = {
     description : 'Are you sure you want to cancel?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .beforeClose()
    .subscribe(response => {
      this.onDeletePost.emit(this.post.id);
    });
  }
}

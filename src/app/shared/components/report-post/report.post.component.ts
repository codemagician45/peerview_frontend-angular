import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
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
  constructor (public dialog: MatDialog) {}
  @Output() protected onDeletePost = new EventEmitter();
  @Input() protected post: PostModel;

  protected openReportModal (): void {
    this.dialog.open(ReportPostModalComponent, {
      data: this.post,
      id: 'SharedReportPostModalComponent'
    });
  }

  protected onOpenConfirmModal (): void {
    console.log(this.post);
    this.dialog.open(SharedConfirmModalComponent, {
      data: this.post,
      id: 'SharedConfirmModalComponent'
    })
    .beforeClose()
    .subscribe(response => {
      this.onDeletePost.emit(this.post.id);
    });
  }
}

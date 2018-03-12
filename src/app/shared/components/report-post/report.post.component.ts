import {
  Component,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  ReportPostModalComponent
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
  @Input() protected post: PostModel;

  protected openReportModal (): void {
    this.dialog.open(ReportPostModalComponent, {
      data: this.post,
      id: 'SharedReportPostModalComponent'
    });
  }
}

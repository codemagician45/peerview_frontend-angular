import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  PostService
} from '../../../../services/services';
import {
  ReportPost,
  PostModel
} from '../../models';
@Component({
  selector: 'report-post-modal',
  templateUrl: 'report.post.modal.component.html'
})
export class ReportPostModalComponent {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    private post: PostModel,
    private postservice: PostService,
    private dialog: MatDialog
  ) {}
  protected isDisabled = true;
  private report = new ReportPost();
  protected isVisible = true;

  protected selectReason (reason): void {
    this.isDisabled = false;

    if (reason === 'not-interested') {
      this.report.reason = 'I am not interested in this Post';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'harmful') {
      this.report.reason = 'This Post is abusive and harmful';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'spam') {
      this.report.reason = 'This Post is posting Spam';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'others') {
      this.report.reason = '';
      this.isVisible = false;
      this.isDisabled = true;
    }
  }

  protected submitReport (): void {
    this.isDisabled = true;
    this.postservice.reportpost(this.post.id, this.report)
      .subscribe((response) => {
        console.log(response);
        let sharedReportPostModalComponent = this.dialog.getDialogById('SharedReportPostModalComponent');
        sharedReportPostModalComponent.close();
        this.report.reason = '';
      }, error => {
        console.log(error);
      });
  }
  protected reportCustomReason (event): void {
    this.isDisabled = false;
  }
}

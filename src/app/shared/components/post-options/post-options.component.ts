import {
  Component,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  SharedPostDetailModalComponent
} from '../../modals';
import {
  PostModel
} from '../../models';

@Component({
  selector: 'shared-post-options-component',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss']
})
export class SharedPostOptionsComponent {
  constructor (
    public dialog: MatDialog
  ) {}

  @Input() protected likes = 0;
  @Input() protected replies = 0;
  @Input() protected views = 0;
  @Input() protected share = 0;
  @Input() protected isShareable: boolean = false;
  @Input() protected post: PostModel;
  @Input() protected ratingCount: number = 0;
  @Input() protected disableRepliesLink: boolean;
  @Input('reply-link') private replyLink = '';
  protected stars: Array<string> = [];
  public user: any;

  public ngOnInit (): void {}

  protected onOpenSharedPostDetailModalComponent (): void {
    /**
     * Because we do have reusable component
     * We will be having infinite onOpenPostDetailDialogComponent
     * for this one to be disble we have to check if
     * disableRepliesLink = true which is set inside
     * under PostDetailComponent
     */
    !this.disableRepliesLink && this.dialog.open(SharedPostDetailModalComponent, {
      data: this.post
    });
  }

  // protected openShare (): void {
  //   this.dialog.open(ShareModalComponent);
  // }
  //
  // protected report (): void {
  //   this.dialog.open(ReportModalComponent);
  // }

  protected likepost (): void {

  }
}

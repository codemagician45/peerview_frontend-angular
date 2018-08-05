import {
  Component,
  OnInit,
  Inject,
  Input
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material';
import {
  PostModel
} from '../../models';

@Component({
  selector: 'shared-post-comment-detail-modal-component',
  templateUrl: './post-comment-detail.component.html',
  styleUrls: ['./post-comment-detail.component.scss']
})
export class SharedPostCommentDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected commentOptions: PostModel) {}

  public ngOnInit (): void {}
}

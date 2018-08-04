import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material';
import {
  PostModel
} from '../../models';

@Component({
  selector: 'shared-post-like-detail-modal-component',
  templateUrl: './post-like-detail.component.html',
  styleUrls: ['./post-like-detail.component.scss']
})
export class SharedPostLikeDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected post: PostModel) {
    console.log(this.post);
  }

  public ngOnInit (): void {}
}

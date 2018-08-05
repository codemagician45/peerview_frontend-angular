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
  selector: 'shared-post-detail-modal-component',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class SharedPostDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected commentOptions: PostModel) {}

  public ngOnInit (): void {}
}

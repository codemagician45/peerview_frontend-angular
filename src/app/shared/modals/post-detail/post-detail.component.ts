import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  UserModel,
  PostModel
} from '../../models';
import {
  UserClass
} from '../../classes';

@Component({
  selector: 'shared-post-detail-modal-component',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class SharedPostDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected post: PostModel) {}

  protected user: UserModel = UserClass.getUser();
  protected stars: Array<string> = [];
  protected disableRepliesLink: boolean = true;

  public ngOnInit (): void {}
}

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
  selector: 'shared-post-like-detail-modal-component',
  templateUrl: './post-like-detail.component.html',
  styleUrls: ['./post-like-detail.component.scss']
})
export class SharedPostLikeDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected post: PostModel) {}

  protected user: UserModel = UserClass.getUser();
  protected stars: Array<string> = [];
  protected disableRepliesLink: boolean = true;

  public ngOnInit (): void {}
}

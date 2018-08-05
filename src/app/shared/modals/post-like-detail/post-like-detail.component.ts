import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material';
import {
  PostModel,
  UserModel
} from '../../models';
import {
  UserClass
} from '../../classes/user';

@Component({
  selector: 'shared-post-like-detail-modal-component',
  templateUrl: './post-like-detail.component.html',
  styleUrls: ['./post-like-detail.component.scss']
})
export class SharedPostLikeDetailModalComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) protected post: PostModel) {
  }

  protected user: UserModel = UserClass.getUser();

  public ngOnInit (): void {}
}

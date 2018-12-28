import {
  Component,
  Input
} from '@angular/core';
import {
  PostApiService,
} from '../../../../services/api';
import {
  UserService,
} from '../../../../services';
import {
  PostModel,
  PostReplyModel,
  UserModel,
  IResponse
} from '../../models';

@Component({
  selector: 'shared-post-reply-comment-component',
  templateUrl: './post-reply-comment.component.html',
  styleUrls: ['./post-reply-comment.component.scss']
})
export class SharedPostReplyCommentComponent {
  constructor (
    private postApiService: PostApiService,
  ) {}

  private user: UserModel = UserService.getUser();
  private postReply: PostReplyModel = new PostReplyModel();
  protected isUserCurrentlyCommenting = false;
  @Input() private post: PostModel = new PostModel();
  @Input() private reply: PostReplyModel = new PostReplyModel();

  public ngOnInit (): void {}

  protected onPostReplyComment (): void {
    this.isUserCurrentlyCommenting = true;
  }

  protected onDeletePostReply (commentId: number): void {
    console.log('commentId', commentId);
  }
}

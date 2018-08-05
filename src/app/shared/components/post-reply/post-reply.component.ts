import {
  Component,
  Input
} from '@angular/core';
import {
  PostApiService
} from '../../../../services/api';
import {
  PostModel,
  PostReplyModel,
  UserModel,
  IResponse
} from '../../models';
import {
  UserClass
} from '../../classes';
import {
  EmitterService
} from '../../emitter/emitter.component';

@Component({
  selector: 'shared-post-reply-component',
  templateUrl: './post-reply.component.html',
  styleUrls: ['./post-reply.component.scss']
})
export class SharedPostReplyComponent {
  constructor (
    private postApiService: PostApiService,
  ) {}

  public user: UserModel = UserClass.getUser();
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  @Input() private post: PostModel = new PostModel();

  protected onPostReply (): void {
    this.isUserCurrentlyCommenting = true;
    this.postApiService.promiseCreatePostReply(this.post.id, this.postReply)
      .then((response: IResponse) => {
        this.postReply.user = this.user;
        this.postReply.createdAt = new Date();
        // clone the postReply
        let postReply: any = this.postReply.clone();
        this.post.postReply.unshift(postReply);
        this.postReply.init(); // this will initialize the data with blank ones
        this.isUserCurrentlyCommenting = false;
      })
      .catch(error => {

      });
  }
}

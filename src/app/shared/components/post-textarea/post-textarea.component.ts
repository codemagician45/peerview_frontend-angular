import {
  Component,
} from '@angular/core';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  PostModel,
  SharePostResponse,
  CreatePost,
  PollModel,
  Option
} from '../../../shared/models';
import {
  PostService
} from '../../../../services/services';
declare let swal: any;

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor (private postService: PostService) {}

  protected post: PostModel = new PostModel();
  protected toggleUploadComponent: boolean = false;
  private createPost: CreatePost = new CreatePost();
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'post';
  private newPoll: PollModel = new PollModel();
  private errorMessage: any;
  protected newPollOption: Option[] = [];

  public ngOnInit (): void {
    this.uploadComplete();
    this.newPollOption.push({option: ''});
    this.newPollOption.push({option: ''});
  }

  protected onAddPost (): void {
    this.isButtonDisabledOnSubmit = true;
    if (this.createPost.message) {
      if (this.toggleUploadComponent) {
        PostEmitter
        .uploadImages()
        .emit('saveImages');
      } else {
        this.postMessageOnly();
      }
    } else {
      console.log('Post message is required.');
    }
  }

  private uploadComplete (): void {
    PostEmitter
    .uploadComplete()
    .subscribe(response => {
      this.createPost.attachments = response;
      if (response.length !== 0) {
        this.postWithAttachments();
      } else {
        this.postMessageOnly();
      }
    });
  }

  private postMessageOnly (): void {
    delete this.createPost.attachments;
    this.postService.createpost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      PostEmitter
      .postSave()
      .emit(response.postId);
      this.createPost.message = '';
      this.isButtonDisabledOnSubmit = false;
    }, error => {
      this.isButtonDisabledOnSubmit = false;
      console.log(error);
    });
  }

  private postWithAttachments (): void {
    this.toggleUploadComponent = false;
    this.postService.createpost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      PostEmitter
      .postSave()
      .emit(response.postId);
      this.createPost.message = '';
      this.createPost.attachments = [];
      this.isButtonDisabledOnSubmit = false;
    }, error => {
      console.log(error);
      this.isButtonDisabledOnSubmit = false;
    });
  }

  protected onShowUploadComponent (): void {
    this.toggleUploadComponent = !this.toggleUploadComponent;
  }

  protected onClickWhichTypeIsSelected (type): void {
    this.typePost = type;
  }

  protected onAddPollOption (): void {
    this.newPollOption.push({option: ''});
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }
}

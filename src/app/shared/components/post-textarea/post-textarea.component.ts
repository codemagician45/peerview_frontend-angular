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
  CreatePost
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
  protected isDisabled = false;
  public ngOnInit (): void {
    this.uploadComplete();
  }

  protected onAddPost (): void {
    this.isDisabled = true;
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
      this.isDisabled = false;
    }, error => {
      this.isDisabled = false;
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
      this.isDisabled = false;
    }, error => {
      console.log(error);
      this.isDisabled = false;
    });
  }

  protected onShowUploadComponent (): void {
    this.toggleUploadComponent = !this.toggleUploadComponent;
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }
}
